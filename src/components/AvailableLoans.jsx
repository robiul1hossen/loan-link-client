import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Title from "./Title";
import LoanCard from "./LoanCard";
import "aos/dist/aos.css";

const AvailableLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { data: loans = [] } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans/featured");
      return res.data;
    },
  });
  console.log(loans);

  return (
    <div>
      <div className="mt-12 mb-6">
        <Title text1={"Available"} text2={"Loans"} />
      </div>
      <div
        data-aos="fade-up"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {loans.map((loan) => (
          <LoanCard key={loan._id} loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default AvailableLoans;
