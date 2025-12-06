import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Title from "./Title";

const AvailableLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { data: loans = [] } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = axiosSecure.get("/loans");
      return (await res).data;
    },
  });
  return (
    <div>
      <Title
        text1={"Available"}
        text2={"Loans"}
        text3={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique nisi sit iure, ducimus ea quidem provident omnis unde optio quasi?"
        }
      />
    </div>
  );
};

export default AvailableLoans;
