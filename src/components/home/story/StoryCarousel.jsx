import React, { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import StoryVideo from "./StoryVideo";
import LinearWithValueLabel from "./ProgressBar";
import { Box, LinearProgress } from "@mui/material";
import { FaEye } from "react-icons/fa";
import SeenUser from "./SeenUser";
import { useDispatch } from "react-redux";
import { seenStory } from "../../../redux/slices/ProfileSlice";

const StoryCarousel = ({ stories, handleCaption, closeEye }) => {
  const [slide, setSlide] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const carasoleref = useRef();
  const dispatch = useDispatch();

  function handleSlideChange(index) {
    setSlide(index);
  }

  useEffect(() => {
    const videoTag =
      carasoleref.current?.itemsRef[slide]?.querySelector("video");
    if (videoTag) {
      const videoDuration = videoTag.duration;
      if (Number.isNaN(videoDuration)) {
        videoTag.onloadedmetadata = () => {
          setDuration(videoTag.duration);
        };
      } else {
        setDuration(videoTag.duration);
      }
    } else {
      if (stories[slide].filetype.includes("image/")) {
        setDuration(5);
      }
    }
    handleCaption(stories[slide].caption);

    if (!stories[slide].isSeen) {
      const addToSeen = async () => {
        await dispatch(seenStory(stories[slide].storyId));
      };
      addToSeen();
    }
  }, [slide]);

  useEffect(() => {
    if (duration) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 100 / ((duration * 1000) / 100);
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [duration]);

  useEffect(() => {
    if (progress === 100 && carasoleref.current) {
      if (
        stories[slide].filetype.includes("video/") ||
        stories[slide].filetype.includes("image/")
      ) {
        carasoleref.current.increment();
      }
    }
  }, [progress]);

  return (
    <div>
      <Box className="flex gap-2">
        {Array.from({ length: stories.length }).map((_, i) => (
          <LinearProgress
            key={i}
            variant="determinate"
            value={i === slide ? progress : i < slide ? 100 : 0}
            sx={{
              flex: 1,
              height: "4px",
              borderRadius: "2px",
              backgroundColor: "grey.300",
            }}
          />
        ))}
      </Box>
      <Carousel
        onChange={handleSlideChange}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        className="mt-2"
        ref={carasoleref}
      >
        {stories.length > 0 &&
          stories.map((story) => (
            <div className="" key={story.storyId}>
              <StoryVideo
                fileType={story.filetype}
                base64={story.storyBase64}
                closeEye={closeEye}
              />

              {closeEye && (
                <div>
                  {story.seenUsers && (
                    <div className="flex gap-2 border-y-2 p-2">
                      <div className="text-2xl">
                        <FaEye />
                      </div>
                      <div>{story.seenUsers.length}</div>
                    </div>
                  )}
                  {/* {story.seenUsers &&
                  story.seenUsers.length > 0 &&
                  story.seenUsers.map((seenUser) => (
                    <div>{seenUser.userName}</div>
                  ))} */}

                  {story.seenUsers &&
                    story.seenUsers.length > 0 &&
                    story.seenUsers.map((seenUser) => (
                      <SeenUser seenUser={seenUser} />
                    ))}
                </div>
              )}
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default StoryCarousel;
