import React, { useEffect, useRef, useState } from "react";
import Title from "../../components/Title";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";

// TODO view all loan application details for admin
const AllLoanApplication = () => {
  const viewDetailsModalRef = useRef();
  const [filtered, setFiltered] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState({});
  const axiosSecure = useAxiosSecure();
  const { data: loans = [] } = useQuery({
    queryKey: ["loan-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan-application`);
      return res.data;
    },
  });

  useEffect(() => {
    setFiltered(loans);
  }, [loans]);

  const handleSort = async (e) => {
    const value = e.target.value;
    await axiosSecure
      .get(`/loan-application?applicationStatus=${value}`)
      .then((res) => {
        setFiltered(res.data);
        console.log(res.data);
      });
  };

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    viewDetailsModalRef.current.showModal();
  };

  return (
    <div>
      <div className="mt-5">
        <Title
          text1={"All Loan"}
          text2={"Applications"}
          text3={
            "    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum dolore architecto omnis animi mollitia totam voluptate atque doloribus voluptates aspernatur.z"
          }
        />
      </div>
      <div className="flex justify-start px-4 md:justify-end ">
        <div className="flex flex-col w-1/2 md:w-1/4">
          <label className="label text-right">Sort By Status</label>
          <select
            onChange={(e) => {
              handleSort(e);
            }}
            className="select select-primary shadow-xl outline-none w-full"
            defaultValue="">
            <option value="" disabled>
              Select Status
            </option>
            <option value="">View All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>loan Id</th>
              <th>Applicant</th>
              <th>Loan Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((loan, i) => (
              <tr key={loan._id}>
                <th>{i + 1}</th>
                <td>{loan._id}</td>
                <td>
                  <div className="flex flex-col">
                    <span>
                      {loan.firstName} {loan.lastName}
                    </span>
                    <span>{loan.email}</span>
                  </div>
                </td>
                <td>{loan.category}</td>
                <td>{loan.loanAmount}</td>
                <td>{loan.applicationStatus}</td>
                <td>
                  <button
                    onClick={() => handleViewDetails(loan)}
                    className="btn btn-xs cursor-pointer">
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
        ref={viewDetailsModalRef}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{selectedLoan.title}</h3>
          <div className="flex flex-col md:flex-row gap-2">
            <div>
              <h3 className="font-bold text-lg pt-3">About Applicant</h3>
              <p className=" text-sm">
                <span className="font-semibold ">Applicant Name:</span>{" "}
                {selectedLoan.firstName} {selectedLoan.lastName}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Applicant email:</span>{" "}
                {selectedLoan.email}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Applicant phone:</span>{" "}
                {selectedLoan.number}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Monthly income:</span>{" "}
                {selectedLoan.monthlyIncome}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Income Source:</span>{" "}
                {selectedLoan.incomeSource}
              </p>
            </div>
            <div>
              <p className="font-bold text-lg">About Loan</p>
              <p className="text-sm">
                <span className="font-semibold ">Loan category:</span>{" "}
                {selectedLoan.category}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Loan amount:</span>{" "}
                {selectedLoan.loanAmount}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Loan Interest:</span>{" "}
                {selectedLoan.interest}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Total Pay:</span>{" "}
                {selectedLoan.totalPay}
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

export default AllLoanApplication;
