import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-24 h-24 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-primary text-2xl font-bold animate-[slide_1s_linear_infinite]"
            style={{
              top: `${Math.random() * 80}%`,
              animationDelay: `${i * 0.1}s`,
            }}>
            $
          </span>
        ))}

        <style>{`
    @keyframes slide {
      0% { transform: translateX(-30px); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateX(120px); opacity: 0; }
    }
  `}</style>
      </div>
    </div>
  );
};

export default Loader;
