import { Box, IconButton } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoVolumeMediumOutline, IoVolumeMuteOutline } from "react-icons/io5";

const PostVideo = ({ fileType, base64, id }) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [muted, setMuted] = useState(true);
  const observerRef = useRef(null);

  useLayoutEffect(() => {
    if (!videoRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current.observe(videoRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.unobserve(videoRef.current);
        observerRef.current.disconnect();
      }
    };
  }, [videoRef]);

  useEffect(() => {
    if (isInView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  const handleMute = () => {
    setMuted(!muted);
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  };

  return (
    <div className="video-container relative object-cover object-center w-full h-100 max-w-full min-h-full p-0.5">
      <video
        ref={videoRef}
        playsInline
        muted={muted}
        loop
        className="object-contain object-center w-full h-[400px]  max-w-full  min-h-full"
        id={id}
      >
        <source
          src={`data:image/${fileType};base64,${base64}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <Box className="absolute right-1 top-2">
        <IconButton onClick={handleMute}>
          {muted ? (
            <IoVolumeMuteOutline className="text-2xl" />
          ) : (
            <IoVolumeMediumOutline className="text-2xl" />
          )}
        </IconButton>
      </Box>
    </div>
  );
};

export default PostVideo;
