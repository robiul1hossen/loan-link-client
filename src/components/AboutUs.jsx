import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full  text-white">
      {/* ===== Hero Section ===== */}
      <section className="bg-linear-to-r from-[#090040] to-[#471396] text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Empowering Smart & Secure Micro-Financing
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            LoanLink is a modern micro-financial platform designed to simplify
            loan applications, approvals, and management through a transparent
            and secure digital system.
          </p>
          <div className="flex justify-center gap-4">
            <button className="cursor-pointer font-semibold px-6 py-3 rounded-lg shadow bg-[#471396] border border-[#e5e5e5] text-white">
              Apply for Loan
            </button>
            <button className="border cursor-pointer bg-[#471396] border-[#e5e5e5] text-white px-6 py-3 rounded-lg">
              Explore Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* ===== Who We Are ===== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-white leading-relaxed mb-4">
              LoanLink is a digital micro-loan management system built to bridge
              the gap between borrowers and financial decision-makers. We focus
              on transparency, efficiency, and user experience.
            </p>
            <p className="text-white leading-relaxed">
              Our platform supports role-based access, allowing users to apply
              for loans, managers to review and approve requests, and admins to
              monitor and control the entire system.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#471396] p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-2">For Users</h3>
              <p className="text-sm text-white">
                Simple loan application process with real-time status tracking.
              </p>
            </div>
            <div className="bg-[#471396] p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-2">For Managers</h3>
              <p className="text-sm text-white">
                Easy loan review, approval, and rejection workflow.
              </p>
            </div>
            <div className="bg-[#471396] p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-2">For Admins</h3>
              <p className="text-sm text-white">
                Full system control with analytics and user management.
              </p>
            </div>
            <div className="bg-[#471396] p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-2">Secure System</h3>
              <p className="text-sm text-white">
                Data security and role-based access control at every level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Mission & Vision ===== */}
      <section className="bg-[#090040] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="p-8 rounded-xl bg-[#471396] shadow">
            <h2 className="text-2xl font-bold mb-4">🎯 Our Mission</h2>
            <p className="text-white leading-relaxed">
              To provide a transparent, efficient, and user-friendly loan
              management experience that empowers individuals and organizations
              through smart financial solutions.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-[#471396] shadow">
            <h2 className="text-2xl font-bold mb-4">🌍 Our Vision</h2>
            <p className="text-white leading-relaxed">
              To become a trusted digital micro-finance solution that promotes
              financial inclusion and simplifies loan accessibility for
              everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Why Choose LoanLink ===== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose LoanLink?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#471396] p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Fast Processing</h3>
              <p className="text-sm text-white">
                Streamlined workflow for quicker loan decisions.
              </p>
            </div>
            <div className="bg-[#471396] p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Transparency</h3>
              <p className="text-sm text-white">
                Clear loan status and approval tracking.
              </p>
            </div>
            <div className="bg-[#471396] p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Secure Platform</h3>
              <p className="text-sm text-white">
                Protected data with modern authentication.
              </p>
            </div>
            <div className="bg-[#471396] p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Scalable System</h3>
              <p className="text-sm text-white">
                Built to grow with your financial operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer CTA ===== */}
      <section className="bg-[#090040] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Smart Loan Management?
          </h2>
          <p className="mb-6 text-lg">
            Join LoanLink today and take control of your financial journey.
          </p>
          <button className="font-semibold px-8 py-3 rounded-lg shadow bg-[#471396] border border-[#e5e5e5] text-white cursor-pointer">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
