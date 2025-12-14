import Title from "./Title";

const WhyChooseLoanLink = () => {
  const benefits = [
    {
      title: "Fast Approval",
      desc: "Get your loan application approved quickly with minimal paperwork.",
      icon: "💨",
    },
    {
      title: "Transparent Rates",
      desc: "No hidden fees. Clear interest rates and processing charges.",
      icon: "💰",
    },
    {
      title: "Secure Platform",
      desc: "Your data is fully protected using modern encryption and security protocols.",
      icon: "🔒",
    },
    {
      title: "User-Friendly Dashboard",
      desc: "Track your loans, applications, and updates in one easy-to-use dashboard.",
      icon: "📊",
    },
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-14">
          <Title text1={" Why Choose"} text2={"LoanLink"} />
        </div>

        <div
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
              <p className="text-slate-600 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLoanLink;
