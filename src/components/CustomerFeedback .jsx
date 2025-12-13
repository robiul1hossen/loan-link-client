import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Title from "./Title";

const feedbacks = [
  {
    name: "Alice Johnson",
    role: "Software Engineer",
    comment:
      "LoanLink made applying for my personal loan so easy and transparent!",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Mark Wilson",
    role: "Business Owner",
    comment:
      "I was able to compare multiple loans quickly and get approved fast.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Sophia Lee",
    role: "Designer",
    comment:
      "The platform is very user-friendly, and tracking my application is effortless.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "David Kim",
    role: "Freelancer",
    comment: "Great customer support and a smooth loan application process!",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
];

const CustomerFeedback = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const length = feedbacks.length;

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Framer Motion variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.6 },
    }),
  };

  return (
    <section className="py-20 ">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-14">
          <Title text1={"What Our"} text2={" Customers Say"} />
        </div>

        {/* Fixed height container */}
        <div className="relative bg-white p-8 rounded-2xl shadow-md overflow-hidden min-h-[250px] flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center text-center px-4">
              <img
                src={feedbacks[current].avatar}
                alt={feedbacks[current].name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <p className="text-slate-600 mb-4 italic">
                "{feedbacks[current].comment}"
              </p>
              <h3 className="text-lg font-semibold text-slate-800">
                {feedbacks[current].name}
              </h3>
              <span className="text-sm text-slate-500">
                {feedbacks[current].role}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
            &#8594;
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {feedbacks.map((_, index) => (
            <span
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                current === index ? "bg-blue-600" : "bg-slate-300"
              }`}></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;
