import React, { use } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";

const LoanDetails = () => {
  const { loading } = use(AuthContext);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${id}`);
      return res.data; // 👈 your DB data
    },
  });

  // animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  // Loading state
  if (isLoading || loading) {
    return (
      <div className="max-w-5xl mx-auto p-10 text-center text-lg font-semibold">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-5">
      {/* //TODO Loan calculator */}
      {/* IMAGE */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="show"
        className="w-full h-64 rounded-2xl overflow-hidden shadow-xl">
        <img
          src={loan.image}
          className="w-full h-full object-cover"
          alt="Loan"
        />
      </motion.div>

      {/* TITLE + DESCRIPTION */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="mt-6">
        <h1 className="text-3xl font-bold">{loan.title}</h1>
        <p className="text-gray-600 mt-2">{loan.description}</p>
      </motion.div>

      {/* BASIC INFO GRID */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-5 mt-6">
        <div className="bg-base-200 p-5 rounded-xl shadow-md">
          <h3 className="font-semibold">Category</h3>
          <p>{loan.category}</p>
        </div>

        <div className="bg-base-200 p-5 rounded-xl shadow-md">
          <h3 className="font-semibold">Interest Rate</h3>
          <p>{loan.interestRate}</p>
        </div>

        <div className="bg-base-200 p-5 rounded-xl shadow-md">
          <h3 className="font-semibold">Max Limit</h3>
          <p>{loan.maxLimit}</p>
        </div>

        <div className="bg-base-200 p-5 rounded-xl shadow-md">
          <h3 className="font-semibold">Processing Fee</h3>
          <p>{loan.processingFee}</p>
        </div>
      </motion.div>

      {/* EMI PLANS */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="mt-8">
        <h3 className="text-xl font-semibold">Available EMI Plans</h3>
        <div className="flex flex-wrap gap-3 mt-3">
          {loan.emiPlans?.map((plan) => (
            <span
              key={plan}
              className="px-4 py-2 rounded-full bg-primary text-white text-sm shadow-md">
              {plan}
            </span>
          ))}
        </div>
      </motion.div>

      {/* FEATURES */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Loan Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {loan.features?.map((item, index) => (
            <div key={index} className="flex gap-2 items-start">
              <CheckCircle className="text-primary mt-1" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ELIGIBILITY */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Eligibility Criteria</h3>
        <ul className="space-y-2">
          {loan.eligibility?.map((item, index) => (
            <li key={index} className="flex gap-2 items-start">
              <ArrowRight className="text-primary mt-1" />
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* APPLY BUTTON */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="mt-10 flex justify-center">
        <button className="btn btn-primary btn-lg px-10 shadow-lg hover:scale-105 duration-300">
          Apply Now
        </button>
      </motion.div>
    </div>
  );
};

export default LoanDetails;
