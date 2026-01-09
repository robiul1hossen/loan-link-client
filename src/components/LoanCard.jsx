import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const LoanCard = ({ loan }) => {
  const { _id, title, description, maxLimit, image, interestRate } = loan;
  return (
    <div className="rounded-lg duration-500 transition-all ease-in-out bg-[#090040] py-0">
      <div className="card card-sm shadow-sm">
        <div className="card-body pt-1 pb-2 px-2">
          <h2 className="card-title font-bold">{title.slice(0, 15)}</h2>
          <img
            className="w-full h-[150px] object-cover hover:scale-105 transition duration-300 overflow-hidden cursor-pointer rounded-lg"
            src={image}
            alt=""
          />
          <p>{description.slice(0, 20)}...</p>
          <div className=" justify-between items-center">
            <p className="text-[13px] font-medium mb-2">
              maxLimit: ${maxLimit} with {interestRate}% interest
            </p>
            <Link to={`/loan-details/${_id}`}>
              <div className="flex gap-1 items-center btn btn-sm btn-outline hover:bg-[#B13BFF] hover:text-white duration-300 transition">
                <button className=" text-[14px] font-medium cursor-pointer">
                  View Details
                </button>
                <FaArrowRight size={18} className="-rotate-45" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
