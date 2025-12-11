import React, { use } from "react";
import Title from "../../components/Title";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";

const LoanAddByManager = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: loans = [] } = useQuery({
    queryKey: ["loans", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${user.email}/manager`);
      return res.data;
    },
  });
  console.log(loans);
  return (
    <div>
      <div className="mt-5">
        <Title
          text1={"Loan Added"}
          text2={"By Manager"}
          text3={
            "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae a amet nobis vel quod accusantium non. Alias quisquam reprehenderit dolore!"
          }
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, i) => (
              <tr key={loan._id}>
                <th>{i + 1}</th>
                <td>
                  <img
                    className="w-12 h-12 rounded-xl object-cover"
                    src={loan.image}
                    alt=""
                  />
                </td>
                <td>{loan.title}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.category}</td>
                <td>
                  <button className="btn btn-xs cursor-pointer">
                    <FaEdit size={16} />
                  </button>
                  <button className="btn btn-xs cursor-pointer">
                    <FaTrash size={16} />
                  </button>
                  <button className="btn btn-xs cursor-pointer">
                    <FaEdit size={16} />
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

export default LoanAddByManager;
