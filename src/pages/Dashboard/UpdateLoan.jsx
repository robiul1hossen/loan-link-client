import React from "react";
import Title from "../../components/Title";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const UpdateLoan = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: loan = {} } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${id}`);
      return res.data;
    },
  });
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: loan,
  });
  const handleUpdateLoan = (data) => {};

  const categories = [
    "Personal Loan",
    "Home Loan",
    "Car Loan",
    "Education Loan",
    "Business Loan",
  ];
  return (
    <div>
      <div>
        <Title text1={"Update"} text2={"Loan"} />
      </div>
      <form
        onSubmit={handleSubmit(handleUpdateLoan)}
        className="space-y-4 p-6 max-w-2xl mx-auto bg-base-100 shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Update Loan</h2>

        <div>
          <label className="font-semibold">Loan Image URL</label>
          <input
            type="text"
            defaultValue={loan.image}
            className="input input-bordered w-full mt-1"
            {...register("image", { required: true })}
          />
        </div>

        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            defaultValue={loan.title}
            className="input input-bordered w-full mt-1"
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            defaultValue={loan.description}
            className="textarea textarea-bordered w-full mt-1"
            rows={3}
            {...register("description", { required: true })}></textarea>
        </div>

        <div>
          <label className="font-semibold">Category</label>
          <select
            className="select select-bordered w-full mt-1"
            {...register("category", { required: true })}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Interest Rate (min-max)</label>
          <input
            type="text"
            className="input input-bordered w-full mt-1"
            defaultValue={loan.interestRate}
            {...register("interestRate", { required: true })}
          />
        </div>

        {/* MAX LIMIT */}
        <div>
          <label className="font-semibold">Max Limit</label>
          <input
            type="number"
            defaultValue={loan.maxLimit}
            className="input input-bordered w-full mt-1"
            {...register("maxLimit", { required: true })}
          />
        </div>

        <div>
          <label className="font-semibold">EMI Plans</label>
          <div className="flex gap-4 mt-2 flex-wrap">
            {[6, 12, 18, 24, 36, 48, 60].map((num) => (
              <label key={num} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={num}
                  defaultChecked={loan?.emiPlans?.includes(num)}
                  {...register("emiPlans")}
                />
                {num} Months
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold">Processing Fee (%)</label>
          <input
            type="number"
            defaultValue={10}
            className="input input-bordered w-full mt-1"
            {...register("processingFee", { required: true })}
          />
        </div>

        <div>
          <label className="font-semibold">Eligibility</label>
          <div className="mt-2 space-y-2">
            {loan.eligibility?.map((item, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked
                  value={item}
                  {...register("eligibility")}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold">Features</label>
          <div className="mt-2 space-y-2">
            {loan.features?.map((item, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked
                  value={item}
                  {...register("features")}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold">Created By</label>
          <input
            type="text"
            defaultValue={loan?.createdBy}
            className="input input-bordered w-full mt-1"
            {...register("createdBy", { required: true })}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button className="btn btn-primary w-full mt-4" type="submit">
          Update Loan
        </button>
      </form>
    </div>
  );
};

export default UpdateLoan;
