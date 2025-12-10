import React from "react";
import Title from "../../components/Title";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const RejectLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { data: loans = [] } = useQuery({
    queryKey: ["approved-loans"],
    queryFn: async () => {
      const res = axiosSecure.get(
        `/loan-application?applicationStatus=approved`
      );
      return (await res).data;
    },
  });
  return (
    <div>
      <div>
        <Title
          text1={"Approved"}
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
              <th>Loan ID</th>
              <th>Applicant Info</th>
              <th>Amount</th>
              <th>Approved Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, i) => (
              <tr key={loan._id}>
                <th>{i + 1}</th>
                <td>{loan._id}</td>
                <td>
                  <span>
                    {" "}
                    {loan.firstName} {loan.lastName}
                  </span>
                  <br />
                  <span>{loan.email}</span>
                </td>
                <td>{loan.loanAmount}</td>
                <td>{moment(loan.approvedAt).format("MM/DD/YYYY")}</td>
                <td>
                  <button className="btn btn-primary btn-xs">Actions</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RejectLoans;
