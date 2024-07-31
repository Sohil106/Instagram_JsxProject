import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import PostVideo from "./PostVideo";

const PostCarousel = ({ PostUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoElements, setVideoElements] = useState({});

  useEffect(() => {
    const videoElementsObj = {};
    PostUrls.forEach((postUrl, index) => {
      if (postUrl.postTypeId === 2) {
        const videoElement = document.getElementById(`video-${index}`);
        videoElementsObj[index] = videoElement;
      }
    });
    setVideoElements(videoElementsObj);
  }, [PostUrls]);

  const handleCarouselChange = (index) => {
    setCurrentIndex(index);
    Object.values(videoElements).forEach((videoElement) => {
      if (videoElement) {
        videoElement.pause();
      }
    });
    if (videoElements[index]) {
      videoElements[index].play();
    }
  };

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={PostUrls.length > 1}
      className="mt-2"
      onChange={handleCarouselChange}
    >
      {PostUrls.length > 0 &&
        PostUrls.map((postUrl, index) => (
          <div
            className="ABC flex items-center h-full w-full  border-2"
            key={postUrl.postUrlId}
          >
            {postUrl.postTypeId == 1 && (
              <img
                className="object-contain object-center w-auto h-[400px] max-w-full  min-h-full p-0.5"
                src={`data:image/${postUrl.fileType};base64,${postUrl.base64}`}
                key={postUrl.postUrlId}
                alt="gallery-photo"
              />
            )}
            {(postUrl.postTypeId == 2 || postUrl.postTypeId == 3) && (
              <PostVideo
                id={`video-${index}`}
                key={postUrl.postUrlId}
                fileType={postUrl.fileType}
                base64={postUrl.base64}
              />
            )}
          </div>
        ))}
    </Carousel>
  );
};

export default PostCarousel;
