import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin flex items-center justify-center">
          <span className="text-green-600 font-bold text-xl animate-pulse">
            $
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
