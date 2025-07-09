import React from "react";

const EmptyContainer = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-[#0f1117] text-white px-6 py-12">
      {/* Text Section */}
      <div className="flex flex-col items-center justify-center text-center  z-10 p-5">
        <h1 className="text-3xl md:text-5xl font-bold leading-snug">
          <span className="text-[#a78bfa]">Hi!</span> Welcome to{" "}
          <span className="text-[#8b5cf6]">Syncronus</span> Chat App.
        </h1>
      </div>

      {/* Animated GIF / Logo Section */}
      <div className="w-full md:w-1/3 mt-12 md:mt-0 flex justify-center ">
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWozejN5Z3luN2RiNzQ5N2NzaHBndjg5M2ZtMjV5eXpldTJmcTJ2NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TJrAmtUDuaevwxv48E/giphy.gif" // Replace this path with your actual gif file
          alt="Loading Animation"
          className="w-[400px] object-contain animate-pulse rounded-full"
        />
      </div>
    </div>
  );
};

export default EmptyContainer;
