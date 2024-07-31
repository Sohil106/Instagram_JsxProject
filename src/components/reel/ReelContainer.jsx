import { Avatar, Box, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import {
  addOrRemovePostLike,
  getotherUserData,
} from "../../redux/slices/ProfileSlice";
import FollowRequestButton from "../../pages/profile/FollowRequestButton";
import { BsHeart, BsHeartFill, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { SlShare } from "react-icons/sl";
import { MdOutlineTurnedInNot } from "react-icons/md";
import { IoVolumeMediumOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { decodeToken } from "../../utils/AuthService";
import CommentsModal from "../shared/CommentsModal";

const ReelContainer = ({ reel, playing }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [muted, setMuted] = useState(false);
  const playerRef = useRef(null);
  const user = decodeToken();
  const [isLiked, setIsLiked] = useState(
    !!reel.postLikes.find(
      (item) => item.userId.toString() === user.UserId.toString()
    )
  );
  const [likesCount, setLikesCount] = useState(
    Array.isArray(reel.postLikes) ? reel.postLikes.length : 0
  );
  const [postOpen, setPostOpen] = useState(false);
  const [pid, setPId] = useState(0);

  const fetchUserData = async () => {
    try {
      const res = await dispatch(getotherUserData(reel.userId));
      if (res.payload.isSuccess) {
        setUserData(res.payload.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [reel.userId]);

  const handleMute = () => {
    setMuted(!muted);
    if (playerRef.current) {
      playerRef.current.muted = muted;
    }
  };

  const handleLike = async (postId) => {
    setIsLiked(!isLiked);
    const res1 = await dispatch(addOrRemovePostLike(postId));
    if (res1.payload.isSuccess) {
      if (isLiked) {
        setLikesCount(likesCount - 1);
      } else {
        setLikesCount(likesCount + 1);
      }
    }
  };

  const handlePostOpen = (postId) => {
    if (postId) {
      setPId(postId);
      setPostOpen(true);
    }
  };
  const handlePostClose = () => {
    setPostOpen(false);
  };
  return (
    <div className="h-[98vh]  relative border-2 border-gray-400 bg-gray-200 flex justify-center">
      <div className="w-full h-full relative ">
        <ReactPlayer
          key={reel.postId}
          url={`data:video/${reel.postUrls[0].filetype.substring(1)};base64,${
            reel.postUrls[0].base64
          }`}
          style={{ aspectRatio: 9 / 16 }}
          height="100%"
          width="100%"
          className="object-contain"
          playing={playing}
          muted={muted}
          ref={playerRef}
          loop
        />
        <div className="absolute bottom-20 left-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-4">
              <div className="flex items-center min-w-fit">
                <Avatar
                  src={`data:image/${reel.profilePictureFiletype};base64,${reel.profilePictureBase64}`}
                  // src={profiledemo}
                  alt="profile"
                  className="rounded-full w-10 h-10"
                />
              </div>
              <div
                className="flex items-center"
                style={{ color: "white", textShadow: "1px 1px 2px black" }}
              >
                {reel.username}
              </div>
            </div>

            <div className="flex gap-2">
              <FollowRequestButton
                userId={userData.userId}
                isPrivate={userData.isPrivate}
                isRequest={userData.isRequest}
                isFollowing={userData.isFollowing}
                isFollowBack={userData.isFollowBack}
                styleClass={true}
              />
            </div>
          </div>
          <div
            className="mt-2"
            style={{ color: "white", textShadow: "1px 1px 2px black" }}
          >
            {reel.caption}
          </div>
        </div>
        <Box className="absolute right-1 bottom-16">
          <Box className="flex flex-col items-center gap-2">
            <div className="flex flex-col justify-center items-center">
              <IconButton
                onClick={() => handleLike(reel.postId)}
                style={{
                  color: isLiked ? "red" : "white",
                  textShadow: "1px 1px 2px black",
                }}
              >
                {isLiked ? (
                  <BsHeartFill className="text-red-600" />
                ) : (
                  <BsHeart />
                )}
              </IconButton>
              <div style={{ color: "white", textShadow: "1px 1px 2px black" }}>
                {likesCount}
              </div>
            </div>

            <IconButton
              onClick={() => handlePostOpen(reel.postId)}
              style={{ color: "white", textShadow: "1px 1px 2px black" }}
            >
              <FaRegComment />
            </IconButton>
            <IconButton
              className="text-xl"
              style={{ color: "white", textShadow: "1px 1px 2px black" }}
            >
              <SlShare />
            </IconButton>
            <IconButton
              style={{ color: "white", textShadow: "1px 1px 2px black" }}
            >
              <MdOutlineTurnedInNot className="text-3xl" />
            </IconButton>
            <IconButton
              className="mt-2"
              style={{ color: "white", textShadow: "1px 1px 2px black" }}
            >
              <BsThreeDots />
            </IconButton>
          </Box>
        </Box>
        <Box className="absolute right-1 top-2">
          <IconButton onClick={handleMute}>
            {muted ? (
              <IoVolumeMuteOutline className="text-2xl" />
            ) : (
              <IoVolumeMediumOutline className="text-2xl" />
            )}
          </IconButton>
        </Box>
        <div>
          {postOpen && (
            <CommentsModal handleClose={handlePostClose} postId={pid} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReelContainer;
