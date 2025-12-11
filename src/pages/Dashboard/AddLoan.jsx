import React, { use } from "react";
import Title from "../../components/Title";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddLoan = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // TODO: set error message
  const categories = [
    "Personal Loan",
    "Home Loan",
    "Car Loan",
    "Education Loan",
    "Business Loan",
  ];
  const eligibility = [
    "Minimum age: 21 years",
    "Must have a stable income",
    "Minimum monthly income: $500+",
    "Valid ID & Address proof required",
    "Must have an active bank account",
    "No loan defaults in the last 12 months",
    "Must be employed or self-employed for at least 6 months",
    "Contact number must be active",
    "Must reside within the service area",
    "Credit score must meet minimum criteria",
  ];
  const features = [
    "Instant approval within 24 hours",
    "Zero prepayment charges",
    "Fully online application",
    "Flexible EMI options",
    "Low processing fee",
    "No collateral required",
    "Track your loan status in real-time",
    "Multiple repayment methods available",
    "Secure and encrypted document handling",
    "24/7 customer support",
  ];

  const handleAddLoan = (data) => {
    data.isFeatured = false;
    axiosSecure
      .post("/loans", data)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Loan Added");
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };
  console.log(user.email);
  return (
    <div>
      <div className="mt-5">
        <Title
          text1={"Add"}
          text2={"Loan"}
          text3={
            "  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente obcaecati tenetur ea praesentium! Fuga sit enim, necessitatibus iste dicta placeat."
          }
        />
      </div>
      <form onSubmit={handleSubmit(handleAddLoan)} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IMAGE */}
          <div>
            <label className="font-semibold">Loan Image URL</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1 outline-none"
              {...register("image", { required: true })}
            />
          </div>

          {/* TITLE */}
          <div>
            <label className="font-semibold">Title</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1 outline-none"
              {...register("title", { required: true })}
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="font-semibold">Category</label>
            <select
              className="select select-bordered w-full mt-1 outline-none"
              {...register("category", { required: true })}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* INTEREST RATE */}
          <div>
            <label className="font-semibold">Interest Rate (min-max)</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1 outline-none"
              {...register("interestRate", { required: true })}
            />
          </div>

          {/* MAX LIMIT */}
          <div>
            <label className="font-semibold">Max Limit</label>
            <input
              type="number"
              className="input input-bordered w-full mt-1 outline-none"
              {...register("maxLimit", { required: true })}
            />
          </div>
          {/* PROCESSING FEE */}
          <div>
            <label className="font-semibold">Processing Fee (%)</label>
            <input
              type="number"
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
                  //   defaultChecked={loan.emiPlans.includes(num)}
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
              {eligibility.map((item, index) => (
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
              {features.map((item, index) => (
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

export default AddLoan;
