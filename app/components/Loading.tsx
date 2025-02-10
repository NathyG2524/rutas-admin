// import { Link } from 'gatsby';
import * as React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
        <p className="absolute top-20 left-1/2 transform -translate-x-1/2 text-gray-600 font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;

