import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const loanAmountData = [
  { name: "Applied", amount: 800000 },
  { name: "Approved", amount: 520000 },
];

const COLORS = ["#4f46e5", "#f59e0b", "#ef4444", "#10b981"];

const Overview = () => {
  const [userRoleData, setUserRoleData] = useState([]);
  const [monthlyLoanData, setMonthlyLoanData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { data: loanState = [] } = useQuery({
    queryKey: ["loanState"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan-application/stats`);
      return res.data;
    },
  });

  useEffect(() => {
    const loadUser = async () => {
      const res = await axiosSecure.get("/user/stats");
      setUserRoleData(res.data);
    };
    const loadMonthlyApply = async () => {
      const res = await axiosSecure.get("/loan-application/monthly-stats");
      setMonthlyLoanData(res.data);
    };

    loadUser();
    loadMonthlyApply();
  }, [axiosSecure]);

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Overview</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Loan Status Pie */}
        <div className=" p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Loan Status Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={loanState}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label>
                {loanState.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Loans Line */}
        <div className=" p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Loan Applications
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyLoanData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Row 2 ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Loan Amount Bar */}
        <div className=" p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Loan Amount Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loanAmountData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Roles Bar */}
        <div className=" p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            System User Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userRoleData}>
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
