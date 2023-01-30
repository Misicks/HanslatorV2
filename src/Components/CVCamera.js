import React, { useState } from 'react';
const Cam = (props) => {
  return (
    <div class='box-content h-96 w-96 rounded-lg'>
      {props.isPaused ? (
        <div>Video Paused</div>
      ) : (
        <img src='http://localhost:5000/video_feed' alt='Video' />
      )}
    </div>
  );
};
export default Cam;
