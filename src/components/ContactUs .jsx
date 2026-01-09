import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now: static submit (future backend / email service)
    console.log("Contact Form Data:", formData);

    alert("Thank you for contacting LoanLink. We will get back to you soon!");

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full bg-[#090040] text-white">
      {/* ===== Hero Section ===== */}
      <section className="bg-linear-to-r from-[#090040] to-[#471396] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact LoanLink
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Have questions about loans or our platform? We’re here to help you
            every step of the way.
          </p>
        </div>
      </section>

      {/* ===== Contact Section ===== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-white mb-8">
              Whether you’re a borrower, manager, or administrator, feel free to
              reach out to us for any assistance or inquiries.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-white  p-3 rounded-full">📧</div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-white">robiul99hossen.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-white  p-3 rounded-full">📞</div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-white">+880 1537436599</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-white p-3 rounded-full">📍</div>
                <div>
                  <h4 className="font-semibold">Office</h4>
                  <p className="text-white">Chattogram, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#471396] p-8 rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B13BFF]"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B13BFF]"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B13BFF]"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-[#090040] border-[#e5e5e5] text-white font-semibold py-3 rounded-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== Footer CTA ===== */}
      <section className="bg-[#090040] text-white py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            We’re Always Ready to Help
          </h2>
          <p className="text-lg">
            LoanLink is committed to providing reliable and transparent
            financial solutions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
