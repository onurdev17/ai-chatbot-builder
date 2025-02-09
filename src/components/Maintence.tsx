import React from "react";

const Maintence = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">It will be active soon..</h2>

          <div className="mt-8 animate-pulse">
            <div className="h-2 bg-gray-200 rounded-full max-w-md mx-auto"></div>
            <div className="space-y-3 mt-4">
              <div className="h-2 bg-gray-200 rounded-full"></div>
              <div className="h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintence;
