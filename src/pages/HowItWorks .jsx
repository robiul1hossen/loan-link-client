// import Title from "../components/Title";

import Title from "../components/Title";

// const HowItWorks = () => {
//   return (
//     <section className="py-20 bg-slate-50">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center mb-14">
//           <Title
//             text1={" How It"}
//             text2={" Works"}
//             text3={"Get your loan in a few simple steps"}
//           />

//           <p className="mt-3 text-slate-600"></p>
//         </div>

//         {/* Steps */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
//             <span className="text-4xl font-bold text-blue-600">01</span>
//             <h3 className="mt-4 text-xl font-semibold">Browse Loans</h3>
//             <p className="mt-2 text-slate-600">
//               Explore loan options with transparent interest rates and limits.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
//             <span className="text-4xl font-bold text-blue-600">02</span>
//             <h3 className="mt-4 text-xl font-semibold">Apply Online</h3>
//             <p className="mt-2 text-slate-600">
//               Submit your loan application securely in just a few clicks.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
//             <span className="text-4xl font-bold text-blue-600">03</span>
//             <h3 className="mt-4 text-xl font-semibold">Get Approved</h3>
//             <p className="mt-2 text-slate-600">
//               Admin reviews your application and updates your status in real
//               time.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Browse Loans",
      desc: "Explore different loan options with transparent interest rates and limits.",
    },
    {
      step: "02",
      title: "Search & Filter",
      desc: "Find the right loan quickly using smart search and filtering options.",
    },
    {
      step: "03",
      title: "View Details",
      desc: "Check full loan information including eligibility and processing fees.",
    },
    {
      step: "04",
      title: "Apply Securely",
      desc: "Submit your loan application safely through a simple online form.",
    },
    {
      step: "05",
      title: "Track Status",
      desc: "Monitor your loan application status in real time from your dashboard.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <Title
            text1={"How It"}
            text2={" Works"}
            text3={" Get your loan approved in 5 simple steps"}
          />

          <p className="mt-3 text-slate-600"></p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <span className="text-4xl font-bold text-blue-600">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
