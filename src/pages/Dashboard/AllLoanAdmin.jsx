import React from "react";
import Title from "../../components/Title";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { SquarePen, Trash2 } from "lucide-react";

const AllLoanAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { data: loans = [] } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/all`);
      return res.data.data;
    },
  });
  console.log(loans);
  return (
    <div>
      <div className="mt-5">
        <Title
          text1={"All"}
          text2={"Loans"}
          text3={
            "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit aliquam provident quasi ipsa ab accusantium amet eveniet eligendi, dignissimos non?"
          }
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Interest</th>
              <th>Created By</th>
              <th>Show to Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, i) => (
              <tr key={loan._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={loan.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{loan.title}</div>
                      <div className="text-sm opacity-50">{loan.category}</div>
                    </div>
                  </div>
                </td>
                <td>{loan.interestRate}</td>
                <td>{loan?.createdBy}</td>
                <td>
                  <button className="btn btn-xs cursor-pointer btn-primary">
                    Add to Home
                  </button>
                </td>
                <th>
                  <button className="">
                    <button className="btn btn-xs cursor-pointer mx-1">
                      <SquarePen size={16} />
                    </button>
                    <button className="btn btn-xs cursor-pointer mx-1">
                      <Trash2 size={16} />
                    </button>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLoanAdmin;
