import React, { use } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const EditLoanByManager = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);

  const axiosSecure = useAxiosSecure();
  const { data: loan = {}, refetch } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${id}`);
      return res.data;
    },
  });
  console.log(loan);
  const { register, handleSubmit } = useForm({ defaultValues: loan });

  const handleEditLoan = (data) => {
    console.log(data);
    axiosSecure.patch(`/loans/${loan._id}/manager`, data).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast.success("Loan data updated");
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleEditLoan)} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IMAGE */}
          <div>
            <label className="font-semibold">Loan Image URL</label>
            <input
              type="text"
              defaultValue={loan.image}
              className="input input-bordered w-full mt-1 outline-none"
              {...register("image", { required: true })}
            />
          </div>

          {/* TITLE */}
          <div>
            <label className="font-semibold">Title</label>
            <input
              type="text"
              defaultValue={loan.title}
              className="input input-bordered w-full mt-1 outline-none"
              {...register("title", { required: true })}
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="font-semibold">Category</label>
            <input
              type="text"
              defaultValue={loan.category}
              className="input input-bordered w-full mt-1 outline-none"
              {...register("category", { required: true })}
            />
          </div>

          {/* INTEREST RATE */}
          <div>
            <label className="font-semibold">Interest Rate (min-max)</label>
            <input
              type="text"
              defaultValue={loan.interestRate}
              className="input input-bordered w-full mt-1 outline-none"
              {...register("interestRate", { required: true })}
            />
          </div>

          {/* MAX LIMIT */}
          <div>
            <label className="font-semibold">Max Limit</label>
            <input
              type="number"
              defaultValue={loan.maxLimit}
              className="input input-bordered w-full mt-1 outline-none"
              {...register("maxLimit", { required: true })}
            />
          </div>
          {/* PROCESSING FEE */}
          <div>
            <label className="font-semibold">Processing Fee (%)</label>
            <input
              type="number"
              defaultValue={loan.processingFee}
              className="input input-bordered w-full mt-1 outline-none"
              {...register("processingFee", { required: true })}
            />
          </div>
          {/* CREATED BY */}
          <div>
            <label className="font-semibold">Created By</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full mt-1 outline-none"
              {...register("createdBy", { required: true })}
            />
          </div>
          {/* CREATOR EMail */}
          <div>
            <label className="font-semibold">Creator Email</label>
            <input
              type="text"
              defaultValue={user.email}
              readOnly
              className="input input-bordered w-full mt-1 outline-none"
              {...register("creatorEmail", { required: true })}
            />
          </div>
        </div>
        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            defaultValue={loan.description}
            className="textarea textarea-bordered w-full mt-1 outline-none"
            rows={3}
            {...register("description", { required: true })}></textarea>
        </div>

        {/* EMI PLANS (checkbox) */}
        <div className="mt-6">
          <label className="font-semibold">EMI Plans</label>
          <div className="flex gap-4 mt-2 flex-wrap">
            {[6, 12, 18, 24, 30, 36, 48, 60].map((num) => (
              <label key={num} className="flex items-center gap-2">
                <input
                  className="outline-none"
                  type="checkbox"
                  value={num}
                  {...register("emiPlans")}
                />
                {num} Months
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-10 mt-6">
          {/* ELIGIBILITY CHECKBOX */}
          <div>
            <label className="font-semibold">Eligibility</label>
            <div className="mt-2 space-y-2">
              {loan?.eligibility?.map((item, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    {...register("eligibility")}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* FEATURES CHECKBOX */}
          <div>
            <label className="font-semibold">Features</label>
            <div className="mt-2 space-y-2">
              {loan?.features?.map((item, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    {...register("features")}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="text-center mt-10">
          <button className="btn btn-primary px-8" type="submit">
            Add A Loan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLoanByManager;
