import React, { use, useEffect, useState } from "react";
import Title from "../../components/Title";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const LoanAddByManager = () => {
  const [searchData, setSearchData] = useState([]);
  // const [keyword, setKeyword] = useState("");
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
  useEffect(() => {
    setSearchData(loans);
  }, [loans]);

  const categories = [
    "Personal Loan",
    "Home Loan",
    "Car Loan",
    "Education Loan",
    "Business Loan",
  ];
  const handleFilter = (e) => {
    const value = e.target.value;
    axiosSecure
      .get(`/loans/filter?category=${value}&creatorEmail=${user?.email}`)
      .then((res) => {
        setSearchData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    axiosSecure
      .get(`/loans/search?keyword=${value}&creatorEmail=${user?.email}`)
      .then((res) => {
        setSearchData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="mt-5">
        <Title
          text1={"Loan Added"}
          text2={"By Manager"}
        />
      </div>

      <div className="flex flex-col justify-end items-end">
        <div className="mt-4 w-[265px]">
          <div className="w-full ">
            <select
              onChange={(e) => handleFilter(e)}
              defaultValue=" Pick a Category"
              className="select outline-none w-full">
              <option defaultValue=" Pick a Category" disabled={true}>
                Pick a Category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="md:text-right mt-2">
          <input
            type="text"
            onChange={(e) => handleSearch(e)}
            placeholder="Search Loans"
            className="input outline-none w-[265px]"
          />
        </div>
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
            {searchData.map((loan, i) => (
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
                      <FaEdit className="text-primary" size={16} />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="btn btn-xs cursor-pointer">
                    <FaTrash className="text-primary" size={16} />
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
