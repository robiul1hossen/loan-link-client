import Title from "../../components/Title";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Eye, SquareCheckBig, X } from "lucide-react";
import moment from "moment";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const PendingLoans = () => {
  const applicationDetailsModalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const [applicationDetails, setApplicationDetails] = useState({});
  const { data: loans = [], refetch } = useQuery({
    queryKey: ["pending-loans"],
    queryFn: async () => {
      const res = axiosSecure.get(
        `/loan-application?applicationStatus=pending`
      );
      return (await res).data;
    },
  });

  const handleApprove = async (loan) => {
    axiosSecure
      .patch(`/loan-application/${loan._id}/approve`)
      .then((res) => {
        refetch();
        if (res.data.modifiedCount) {
          toast.success("Loan Approved");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleReject = async (loan) => {
    axiosSecure
      .patch(`/loan-application/${loan._id}/reject`)
      .then((res) => {
        refetch();
        if (res.data.modifiedCount) {
          toast.success("Loan Rejected");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleViewDetails = (loan) => {
    setApplicationDetails(loan);
    applicationDetailsModalRef.current.showModal();
  };

  return (
    <div>
      <div>
        <Title
          text1={"Pending"}
          text2={"Loans"}
          text3={
            "    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque eveniet earum fugit possimus, maxime dolore odio tenetur iure? Error, dignissimos!"
          }
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Loan Id</th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Application Fee</th>
              <th>Apply Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, i) => (
              <tr key={loan._id}>
                <th>{i + 1}</th>
                <td>{loan._id}</td>
                <td>
                  {
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {loan.firstName} {loan.lastName}
                      </span>
                      <span>{loan.email}</span>
                    </div>
                  }
                </td>
                <td>${loan.loanAmount}</td>
                <td>{loan.paymentStatus}</td>
                <td>{moment(loan.createdAt).format("MM/DD/YYYY")}</td>
                <td>
                  <button
                    onClick={() => handleApprove(loan)}
                    className="btn btn-sm hover:btn-primary mx-1">
                    <SquareCheckBig size={16} />
                  </button>
                  <button
                    onClick={() => handleReject(loan)}
                    className="btn btn-sm hover:btn-primary mx-1">
                    <X size={16} />
                  </button>
                  <button
                    onClick={() => {
                      handleViewDetails(loan);
                    }}
                    className="btn btn-sm hover:btn-primary mx-1">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        ref={applicationDetailsModalRef}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{applicationDetails.title}</h3>
          <div className="flex flex-col md:flex-row gap-2">
            <div>
              <h3 className="font-bold text-lg pt-3">About Applicant</h3>
              <p className=" text-sm">
                <span className="font-semibold ">Applicant Name:</span>{" "}
                {applicationDetails.firstName} {applicationDetails.lastName}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Applicant email:</span>{" "}
                {applicationDetails.email}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Applicant phone:</span>{" "}
                {applicationDetails.number}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Monthly income:</span>{" "}
                {applicationDetails.monthlyIncome}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Income Source:</span>{" "}
                {applicationDetails.incomeSource}
              </p>
            </div>
            <div>
              <p className="font-bold text-lg">About Loan</p>
              <p className="text-sm">
                <span className="font-semibold ">Loan category:</span>{" "}
                {applicationDetails.category}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Loan amount:</span>{" "}
                {applicationDetails.loanAmount}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Loan Interest:</span>{" "}
                {applicationDetails.interest}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Total Pay:</span>{" "}
                {applicationDetails.totalPay}
              </p>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PendingLoans;
