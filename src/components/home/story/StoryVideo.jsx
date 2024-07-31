// import { DefaultPlayer as Video } from 'react-html5video';
// import 'react-html5video/dist/styles.css';
// import "./PostVideo.css"

import { useEffect, useRef, useState } from "react";

const StoryVideo = ({ fileType, base64, closeEye }) => {
  return (
    <div className="flex justify-center video-container relative object-cover object-center w-full max-w-full min-h-full p-12 ">
      {fileType.includes("video/") && (
        <video
          // loop
          autoPlay
          playsInline
          muted
          // controls
          className={`${
            closeEye ? "w-[400px]" : "w-full"
          } object-cover p-0.5 aspect-video border-2 border-gray-600 rounded-xl`}
        >
          <source
            src={`data:image/${fileType};base64,${base64}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}
      {fileType.includes("image/") && (
        <img
          className="object-cover object-center w-full h-[400px] max-w-full  min-h-full"
          src={`data:image/${fileType};base64,${base64}`}
          alt="gallery-photo"
        />
      )}
    </div>
  );
};

export default StoryVideo;
