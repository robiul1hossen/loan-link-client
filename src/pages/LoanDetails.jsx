import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoanDetails = () => {
  const { loading, user } = use(AuthContext);
  const [userData, setUserData] = useState({});
  const [emiSelect, setEmiSelect] = useState("");
  const [selectedEmi, setSelectedEmi] = useState(null);
  const [totalPay, setTotalPay] = useState(0);
  const [interestPar, setInterestPar] = useState(0);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${id}`);
      return res.data;
    },
  });
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/user?email=${user.email}`).then((res) => {
      setUserData(res.data);
    });
  }, [user?.email]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  if (isLoading || loading) {
    return (
      <div className="max-w-5xl mx-auto p-10 text-center text-lg font-semibold">
        <Loader />
      </div>
    );
  }

  const calculateLoan = (inputAmount) => {
    if (!selectedEmi) {
      return setEmiSelect("Please select an EMI plan");
    } else {
      setEmiSelect("");
    }

    const [minRate, maxRate] = loan.interestRate.split("-").map(Number);
    let interestRate = minRate;

    if (selectedEmi <= 6) interestRate = minRate;
    if (selectedEmi > 6 && selectedEmi <= 12)
      interestRate = (minRate + maxRate) / 2 - 0.5;
    if (selectedEmi > 12 && selectedEmi <= 18)
      interestRate = (minRate + maxRate) / 2;
    if (selectedEmi > 18 && selectedEmi <= 24)
      interestRate = (minRate + maxRate) / 2 + 0.5;
    if (selectedEmi > 24) interestRate = maxRate;

    setInterestPar(interestRate);

    const interestAmount = (inputAmount * interestRate) / 100;
    const processingFee = (inputAmount * Number(loan.processingFee)) / 100;
    const total = inputAmount + interestAmount + processingFee;

    setTotalPay(total);
  };
  const handleCalculate = (e) => {
    e.preventDefault();
    calculateLoan(Number(amount));
  };
  const handleApply = () => {
    if (!selectedEmi) {
      toast.error("Select EMI Plans");
      return;
    }
    if (!amount) {
      toast.error("Enter your desire loan amount");
      return;
    }

    navigate("/loan-form", {
      state: {
        selectedEmi,
        amount,
        interestPar,
        title: loan.title,
        totalPay,
        category: loan.category,
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-5">
      {/* //TODO Loan calculator */}

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

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="mt-6">
        <h1 className="text-3xl font-bold">{loan.title}</h1>
        <p className="text-gray-600 mt-2">{loan.description}</p>
      </motion.div>

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
          <p>{loan.interestRate}%</p>
        </div>

        <div className="bg-base-200 p-5 rounded-xl shadow-md">
          <h3 className="font-semibold">Max Limit</h3>
          <p>${loan.maxLimit}</p>
        </div>

        <div className="bg-base-200 p-5 rounded-xl shadow-md">
          <h3 className="font-semibold">Processing Fee</h3>
          <p>{loan.processingFee}% of loan amount</p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="mt-8">
        <h3 className="text-xl font-semibold">Available EMI Plans</h3>

        <div className="">
          <div className="flex flex-wrap gap-3 mt-3 mb-1 w-full">
            {loan.emiPlans?.map((plan) => (
              <span
                key={plan}
                onClick={() => setSelectedEmi(plan)}
                className={`px-4 py-2 rounded-full text-sm shadow-md cursor-pointer duration-300 transition-all 
        ${
          selectedEmi === plan
            ? "bg-primary text-white"
            : "bg-base-100 text-black hover:bg-primary hover:text-white"
        }
      `}>
                {plan} Months
              </span>
            ))}
          </div>
          <span>{emiSelect}</span>
          <div className="w-full mt-5">
            <form onSubmit={handleCalculate} className="flex flex-col gap-1 ">
              <label htmlFor="" className="text-left">
                Enter Amount to Calculate Your Loan
              </label>
              <input
                type="number"
                name="amount"
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setAmount(val);
                  calculateLoan(val);
                }}
                required
                className="input outline-none"
              />
            </form>
          </div>
        </div>
        <p>
          {totalPay === 0 ? "" : <span>Total Payable Amount ${totalPay}</span>}
        </p>
      </motion.div>

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

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="mt-10 flex justify-center">
        <button
          onClick={handleApply}
          disabled={userData?.role !== "Borrower"}
          className={`btn btn-primary btn-lg px-10 shadow-lg duration-300 
    ${
      userData?.role !== "Borrower"
        ? "btn-disabled opacity-50 cursor-not-allowed"
        : "hover:scale-105"
    }
  `}>
          Apply Now
        </button>
      </motion.div>
    </div>
  );
};

export default LoanDetails;
