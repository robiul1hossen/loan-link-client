import React, { use } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
// import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

const ApplyLoanForm = () => {
  const { state } = useLocation();
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  // const { data } = useQuery({
  //   queryKey: ["loanForm", user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.post(``);
  //     return res.data;
  //   },
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLoanForm = (data) => {
    axiosSecure.post("/loan-application", data).then((res) => {
      if (res.data.insertedId) {
        toast.success("Your application has been submitted");
        console.log(res.data);
      }
    });
  };
  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit(handleLoanForm)}>
        <div className="card-body">
          <fieldset className="fieldset">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col w-full">
                <label className="label">First Name</label>
                <input
                  type="text"
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
                <label className="label">National ID / Passport Number</label>
                <input
                  type="text"
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
                  defaultValue={state.title}
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
                <label className="label">Loan Category</label>
                <input
                  type="text"
                  defaultValue={state.category}
                  readOnly
                  {...register("category", { required: true })}
                  className="input outline-none w-full"
                  placeholder="Loan category"
                />
                {errors.category && (
                  <span className="text-sm text-red-500">
                    Category is required
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label className="label">Loan Amount</label>
                <input
                  type="number"
                  defaultValue={state.amount}
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
                  defaultValue={state.interestPar}
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
                  defaultValue={state.totalPay}
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
                type="text"
                rows="10"
                cols="50"
                {...register("notes")}
                className="input outline-none w-full"
                placeholder="Add a note"
              />
            </div>
            <div className="text-center">
              <button className="btn btn-primary mt-4 px-12">Apply</button>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default ApplyLoanForm;
