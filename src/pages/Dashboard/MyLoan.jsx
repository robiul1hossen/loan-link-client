import React, { useContext, useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import Title from "../../components/Title";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyLoan = () => {
  const { user, loading } = useContext(AuthContext);
  const [selectedLoan, setSelectedLoan] = useState({});
  const axiosSecure = useAxiosSecure();
  const editLoanModalRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(user);
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

  const handleEdit = (data) => {
    axiosSecure
      .patch(`/loan-application/${selectedLoan._id}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Your application has been updated");
        }
      });
  };

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/loan-application/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            toast.success("Your loan application has been deleted");
          }
        });
      }
    });
  };

  const openEditLoanModal = (loan) => {
    setSelectedLoan(loan);
    editLoanModalRef.current.showModal();
  };

  if (loading || isLoading) {
    return <Loader />;
  }
  console.log(selectedLoan);
  return (
    <div>
      <div className="mt-5">
        <Title
          text1={"My"}
          text2={"Loan"}
          text3={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut et repudiandae corporis quaerat quibusdam necessitatibus illo quae nostrum soluta."
          }
        />
      </div>
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
                  <button
                    onClick={() => openEditLoanModal(loan)}
                    className="btn btn-xs btn-primary cursor-pointer mx-1">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="btn btn-xs btn-primary cursor-pointer mx-1  ">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog
          ref={editLoanModalRef}
          className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="py-0">
              <form onSubmit={handleSubmit(handleEdit)}>
                <div className="card-body">
                  <fieldset className="fieldset">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex flex-col w-full">
                        <label className="label">First Name</label>
                        <input
                          type="text"
                          defaultValue={selectedLoan.firstName}
                          {...register("firstName", { required: true })}
                          className="input outline-none w-full"
                          placeholder="First Name"
                        />
                        {errors.firstName && (
                          <span className="text-sm text-red-500">
                            First Name is required
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">Last Name</label>
                        <input
                          type="text"
                          defaultValue={selectedLoan.lastName}
                          {...register("lastName", { required: true })}
                          className="input outline-none w-full"
                          placeholder="Last Name"
                        />
                        {errors.lastName && (
                          <span className="text-sm text-red-500">
                            Last Name is required
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">Email</label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          readOnly
                          {...register("email", { required: true })}
                          className="input outline-none w-full"
                          placeholder="Email"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">Contact Number</label>
                        <input
                          type="text"
                          defaultValue={selectedLoan.number}
                          {...register("number", { required: true })}
                          className="input outline-none w-full"
                          placeholder="Contact Number"
                        />
                        {errors.number && (
                          <span className="text-sm text-red-500">
                            Contact Number is required
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">
                          National ID / Passport Number
                        </label>
                        <input
                          type="text"
                          defaultValue={selectedLoan.nid}
                          {...register("nid", { required: true })}
                          className="input outline-none w-full"
                          placeholder="National ID / Passport Number"
                        />
                        {errors.nid && (
                          <span className="text-sm text-red-500">
                            National ID / Passport Number is required
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">Income Source</label>
                        <input
                          type="text"
                          defaultValue={selectedLoan.incomeSource}
                          {...register("incomeSource", { required: true })}
                          className="input outline-none w-full"
                          placeholder="Your income source"
                        />
                        {errors.incomeSource && (
                          <span className="text-sm text-red-500">
                            Income Source is required
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">Monthly Income</label>
                        <input
                          type="number"
                          defaultValue={selectedLoan.monthlyIncome}
                          {...register("monthlyIncome", { required: true })}
                          className="input outline-none w-full"
                          placeholder="Your monthly income"
                        />
                        {errors.monthlyIncome && (
                          <span className="text-sm text-red-500">
                            Monthly income is required
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">Loan Title</label>
                        <input
                          type="text"
                          defaultValue={selectedLoan.title}
                          readOnly
                          {...register("title", { required: true })}
                          className="input outline-none w-full"
                          placeholder="Loan Title"
                        />
                        {errors.title && (
                          <span className="text-sm text-red-500">
                            Title is required
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">Loan Amount</label>
                        <input
                          type="number"
                          defaultValue={selectedLoan.loanAmount}
                          readOnly
                          {...register("loanAmount", { required: true })}
                          className="input outline-none w-full"
                          placeholder="Your desire loan amount"
                        />
                        {errors.loanAmount && (
                          <span className="text-sm text-red-500">
                            Loan amount is required
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">Interest</label>
                        <input
                          type="number"
                          defaultValue={selectedLoan.interest}
                          readOnly
                          {...register("interest", { required: true })}
                          className="input outline-none w-full"
                          placeholder="Your desire loan amount"
                        />
                        {errors.interest && (
                          <span className="text-sm text-red-500">
                            Interest Rate amount is required
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">Total Pay</label>
                        <input
                          type="text"
                          defaultValue={selectedLoan.totalPay}
                          readOnly
                          {...register("totalPay", { required: true })}
                          className="input outline-none w-full"
                          placeholder="Total Pay"
                        />
                        {errors.totalPay && (
                          <span className="text-sm text-red-500">
                            Total is required
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">Reason for Loan</label>
                        <input
                          type="text"
                          defaultValue={selectedLoan?.loanReason}
                          {...register("loanReason", { required: true })}
                          className="input outline-none w-full"
                          placeholder="Describe your loan reason"
                        />
                        {errors.loanReason && (
                          <span className="text-sm text-red-500">
                            Reason for Loan is required
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="label">Address</label>
                        <input
                          type="text"
                          defaultValue={selectedLoan.address}
                          {...register("address", { required: true })}
                          className="input outline-none w-full"
                          placeholder="Your Address"
                        />
                        {errors.address && (
                          <span className="text-sm text-red-500">
                            Your address is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="label">Extra Notes</label>
                      <textarea
                        defaultValue={selectedLoan.notes}
                        type="text"
                        rows="10"
                        cols="50"
                        {...register("notes")}
                        className="input outline-none w-full"
                        placeholder="Add a note"
                      />
                    </div>
                    <div className="text-center">
                      <button className="btn btn-primary mt-4 px-12">
                        Edit
                      </button>
                    </div>
                  </fieldset>
                </div>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyLoan;
