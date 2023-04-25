import React, { useState } from "react";
const Cam = (props) => {
  return (
    <div class="h-96 w-3/5 ">
      {props.isPaused ? (
        <div className="flex justify-end items-center h-96 w-96 font-mono text-2xl ">
          Video Pausado
        </div>
      ) : (
        <img
          className="rounded-2xl drop-shadow-2xl"
          src="http://localhost:5000/api/video_feed"
          alt="Video"
        />
      )}
    </div>
  );
};
export default Cam;
