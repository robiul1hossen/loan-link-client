const GetStartedCTA = () => {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Your Loan?</h2>
        <p className="mb-8 text-lg">
          Join thousands of happy users and get access to fast and secure loans
          today!
        </p>
        <a
          href="/loan-form"
          className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-full shadow hover:shadow-lg transition">
          Apply Now
        </a>
      </div>
    </section>
  );
};

export default GetStartedCTA;
