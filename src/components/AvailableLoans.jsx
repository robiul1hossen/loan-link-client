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
      const res = axiosSecure.get("/loans/featured");
      return (await res).data;
    },
  });

  return (
    <div>
      <div className="mt-12 mb-6">
        <Title
          text1={"Available"}
          text2={"Loans"}
          text3={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique nisi sit iure, ducimus ea quidem provident omnis unde optio quasi?"
          }
        />
      </div>
      <div
        data-aos="fade-up"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loans.map((loan) => (
          <LoanCard key={loan._id} loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default AvailableLoans;
