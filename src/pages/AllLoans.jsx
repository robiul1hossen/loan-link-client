import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../components/Loader";
import LoanCard from "../components/LoanCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const AllLoans = () => {
  const [page, setPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["loans", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/all?page=${page}&limit=6`);
      return res.data;
    },
  });
  console.log(loans);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2> All loans here {loans.data.length}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loans?.data?.map((loan) => (
          <LoanCard key={loan._id} loan={loan} />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <div className="join">
          {/* Left Arrow */}

          <button
            className=""
            onClick={() => setPage(page - 1)}
            disabled={page === 1}>
            <FaArrowLeft className="mx-2" />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: loans?.totalPages || 0 }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={` mx-2 ${
                  pageNum === page
                    ? "btn-primary btn btn-xs"
                    : "btn btn-outline hover:btn-primary btn-xs"
                }`}>
                {pageNum}
              </button>
            )
          )}

          {/* Right Arrow */}
          <button
            className=""
            onClick={() => setPage(page + 1)}
            disabled={page === loans?.totalPages}>
            <FaArrowRight className="mx-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllLoans;
