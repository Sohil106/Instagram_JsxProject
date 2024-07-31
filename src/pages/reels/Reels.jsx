import React, { useEffect, useReducer, useRef, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch } from "react-redux";
import {
  getHomePagePostList,
  getReelPagePostList,
} from "../../redux/slices/ProfileSlice";
import ReactPlayer from "react-player";
import ReelContainer from "../../components/reel/ReelContainer";

const Reels = () => {
  const dispatch = useDispatch();
  const [reelsList, setreelsList] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);

  const containerRef = useRef();
  useEffect(() => {
    const sections = containerRef.current.querySelectorAll(".section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.prototype.indexOf.call(sections, entry.target);
            setPlayingIndex(index);
            // entry.target.scrollIntoView({ behavior: "smooth" });
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  });

  const fetchReelsList = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const res = await dispatch(getReelPagePostList());
    if (res.payload.isSuccess) {
      setreelsList(res.payload.data.data);
    }
  };

  useEffect(() => {
    fetchReelsList();
  }, []);
  return (
    <HomeLayout>
      <div
        className="flex flex-col overflow-y-auto h-screen snap-y snap-mandatory"
        ref={containerRef}
      >
        {reelsList &&
          reelsList.length > 0 &&
          reelsList.map((reel, index) => (
            <div
              key={index}
              className="section flex h-screen items-center justify-center snap-start"
              style={{ flex: "0 0 100vh" }}
            >
              {/* {reel.postUrls[0].fileType} */}

              <ReelContainer
                key={reel.postId}
                reel={reel}
                playing={playingIndex === index}
              />
            </div>
          ))}
      </div>
    </HomeLayout>
  );
};

export default Reels;
