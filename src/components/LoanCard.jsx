import React from "react";
import { FaArrowRight } from "react-icons/fa";

const LoanCard = ({ loan }) => {
  console.log(loan);
  const { loanTitle, loanDetails, maxLoanLimit, loanImage } = loan;
  return (
    <div>
      <div className="card  bg-base-100 card-sm shadow-sm">
        <div className="card-body">
          <h2 className="card-title font-bold">{loanTitle}</h2>
          <img
            className="w-full h-[150px] object-cover hover:scale-105 transition duration-300 overflow-hidden cursor-pointer rounded-lg"
            src={loanImage}
            alt=""
          />
          <p>{loanDetails.slice(0, 60)}...</p>
          <div className=" justify-between items-center">
            <p className="text-[14px] font-medium mb-2">
              Maximum Loan Limit: ${maxLoanLimit}
            </p>
            <div className="flex gap-1 items-center btn btn-sm btn-outline hover:btn-primary duration-300 transition">
              <button className=" text-[14px] font-medium cursor-pointer">
                View Details
              </button>
              <FaArrowRight size={18} className="-rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
