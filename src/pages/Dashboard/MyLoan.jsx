import React, { use } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyLoan = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: loans = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["loans", user?.email],
    queryFn: async () => {
      const res = axiosSecure.get(`/loan-application?email=${user?.email}`);
      return (await res).data;
    },
  });
  if (loading || isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <h2 className="text-4xl">My loan</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Loan Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Loan Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <th>{index + 1}</th>
                <td>{loan.title}</td>
                <td>{loan.loanAmount}</td>
                <td>{loan.status}</td>
                <td>{loan._id}</td>
                <td>
                  <button className="btn btn-xs btn-primary cursor-pointer mx-1">
                    <FaEdit />
                  </button>
                  <button className="btn btn-xs btn-primary cursor-pointer mx-1  ">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLoan;
