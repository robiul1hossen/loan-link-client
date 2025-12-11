import React from "react";
import Title from "../../components/Title";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";

// TODO view all loan application details for admin
const AllLoanApplication = () => {
  const axiosSecure = useAxiosSecure();
  const { data: loans = [] } = useQuery({
    queryKey: ["loan-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan-application`);
      return res.data;
    },
  });
  return (
    <div>
      <div className="mt-5">
        <Title
          text1={"All"}
          text2={"Loans"}
          text3={
            "    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum dolore architecto omnis animi mollitia totam voluptate atque doloribus voluptates aspernatur.z"
          }
        />
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
            {loans.map((loan, i) => (
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
                  <button className="btn btn-xs cursor-pointer">
                    <Eye size={16} />
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

export default AllLoanApplication;
