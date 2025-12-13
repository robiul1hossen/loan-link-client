import React, { useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Title from "./Title";
import LoanCard from "./LoanCard";
import AOS from "aos";
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

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // whether animation should happen only once
    });
  }, []);
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
