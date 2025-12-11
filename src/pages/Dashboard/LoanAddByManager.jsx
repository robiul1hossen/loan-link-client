import React, { use } from "react";
import Title from "../../components/Title";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const LoanAddByManager = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: loans = [], refetch } = useQuery({
    queryKey: ["loans", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${user.email}/manager`);
      return res.data;
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/loans/${id}/manager`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            toast.success("Loan deleted");
          }
        });
      }
    });
  };
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
                  <Link to={`/dashboard/edit-loan/${loan._id}`}>
                    <button className="btn btn-xs cursor-pointer">
                      <FaEdit size={16} />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="btn btn-xs cursor-pointer">
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
