import Title from "../../components/Title";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Cog, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AllLoanAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { data: loans = [], refetch } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/all`);
      return res.data.data;
    },
  });
  const handleDeleteLoan = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/loans/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            toast.success("Loan application deleted by admin");
          }
        });
      }
    });
  };

  const handleCheck = (e, loan) => {
    const value = e.target.checked;
    const isFeatured = { isFeatured: value };
    console.log(isFeatured);
    axiosSecure.patch(`/loans/featured/${loan._id}`, isFeatured).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        if (value) {
          toast.success("Loan added to home");
        } else {
          toast.success("Loan removed to home");
        }
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <div>
      <div className="mt-5">
        <Title text1={"All"} text2={"Loans"} />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Interest</th>
              <th>Created By</th>
              <th>Show to Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, i) => (
              <tr key={loan._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          loading="lazy"
                          // src={loan.image}
                          src=""
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{loan.title}</div>
                      <div className="text-sm opacity-50">{loan.category}</div>
                    </div>
                  </div>
                </td>
                <td>{loan.interestRate}</td>
                <td>{loan?.createdBy}</td>
                <td>
                  <button className="">
                    <input
                      onChange={(e) => handleCheck(e, loan)}
                      checked={loan.isFeatured}
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </button>
                </td>
                <th>
                  <div className="">
                    <Link to={`/dashboard/update-loan/${loan._id}`}>
                      <button className="btn btn-xs cursor-pointer mx-1">
                        <SquarePen size={16} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteLoan(loan._id)}
                      className="btn btn-xs cursor-pointer mx-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLoanAdmin;
