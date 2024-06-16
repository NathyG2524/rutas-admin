"use client"
import axios from "axios";
import * as React from "react";

const TestDownload = () => {
  const [cover, setCover] = React.useState("");

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/upcoming-trips/download/2cea3484bd487b74d31020d6fdcf484b4.png",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setCover(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <div className="">
        <img src={cover} alt="Cover Image" />
        <button
          onClick={handleDownload}
          className="flex items-center space-x-1 rounded-md gap-2 w-full px-4 py-3 bg-gray-100 text-blue-600"
        >
          Download
        </button>
      </div>
    </>
  );
};

export default TestDownload;
