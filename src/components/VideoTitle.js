import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[12%] md:pt-[15%] px-10 md:px-24 absolute text-white bg-gradient-to-r from-black ">
      <h1 className="text-xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div>
        <button className="px-3 py-1 rounded-md bg-white text-black md:p-4 hover:bg-opacity-70 md:px-12 md:rounded-lg">
          ▶ Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-4 bg-opacity-50 px-12 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
