import { useEffect, useState } from "react";
import CountUp from "react-countup";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Title from "./Title";

const LoanStats = () => {
  const [stats, setStats] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await axiosSecure.get("/api/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    loadStats();
  }, [axiosSecure]);
  //   console.log(stats?.totalDisbursed?.toString());
  console.log(Number(stats?.totalDisbursed || 0).toLocaleString());

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-gray-400 text-lg">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <Title text1={"Platform"} text2={"Insights"} />
      <section className="bg-[#090040] text-white py-16">
        <div className=" mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="Total Applications"
              value={stats.totalApplications}
            />
            <StatCard title="Approved Loans" value={stats.approvedLoans} />
            <StatCard title="Pending Requests" value={stats.pendingLoans} />
            <StatCard
              title="Total Disbursed"
              value={Number(stats?.totalDisbursed || 0)}
              prefix="৳"
            />
          </div>

          {/* Optional Chart / Info Section */}
          <div className="bg-[#471396] rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Overview
            </h3>
            <p className="text-white">
              These numbers reflect real-time loan activity. Detailed analytics
              and charts are available in the Admin Dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({ title, value, prefix = "" }) => {
  return (
    <div
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className="bg-[#471396] rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1">
      <h3 className="text-3xl font-bold text-white">
        <CountUp end={value} duration={1.5} separator="," prefix={prefix} />
      </h3>
      <p className="text-white mt-1">{title}</p>
    </div>
  );
};

export default LoanStats;
