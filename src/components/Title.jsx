import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="w-full mb-6 bg-linear-to-r from-[#090040] to-[#471396] text-white py-10">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold -mb-1 ">
          {text1} {text2}
        </h2>

        <svg
          viewBox="0 0 600 120"
          className="w-40 md:w-52 mx-auto animate-draw"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="curveGradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#570DF8" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>

          <path
            d="M0 100 C200 10 400 10 600 100"
            stroke="url(#curveGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            className="animate-thickDraw"
          />
        </svg>

        <style>{`
  @keyframes drawLine {
    0% {
      stroke-dasharray: 800;
      stroke-dashoffset: 800;
    }
    100% {
      stroke-dasharray: 800;
      stroke-dashoffset: 0;
    }
  }

  @keyframes strokeGrow {
    0% {
      stroke-width: 4;
    }
    100% {
      stroke-width: 18;
    }
  }

  .animate-draw path {
    animation: drawLine 1.8s ease forwards;
  }

  .animate-thickDraw {
    animation: strokeGrow 1.8s ease forwards;
    stroke-linecap: round; /* makes the end rounded */
  }
`}</style>
        <p className="w-full md:w-1/2 px-4 md:px-0 mx-auto mt-1">
          “Discover the best loans tailored for you, offering flexible terms,
          competitive rates, and fast approvals.”
        </p>
      </div>
    </div>
  );
};

export default Title;
