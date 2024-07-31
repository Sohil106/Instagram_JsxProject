import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostList } from "../../redux/slices/ProfileSlice";
import { RotatingLines } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PostVideo from "../home/PostVideo";
import MyPostsModel from "../../components/profile/MyPostsModel";
import { Box, IconButton } from "@mui/material";
import {
  IoVolumeMediumOutline,
  IoVolumeMute,
  IoVolumeMuteOutline,
} from "react-icons/io5";

const Reels = ({ userId }) => {
  const dispatch = useDispatch();
  const [postList, setPostList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [muted, setMuted] = useState(true);

  // useEffect(() => {
  //   setPageNumber(1);
  // },[pageNumber])

  const fethPostList = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await dispatch(
        getPostList({
          userId: userId,
          postListType: 1,
          PageNumber: pageNumber,
          PageSize: 6,
        })
      );
      if (res.payload.isSuccess) {
        const requiredPage = res.payload.data.requiredPage;

        if (requiredPage >= pageNumber) {
          const newPostData = res.payload.data.data;
          if (pageNumber === 1) {
            setPostList(newPostData);
          } else {
            setPostList((prevPostData) => [...prevPostData, ...newPostData]);
          }
          setPageNumber(pageNumber + 1);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fethPostList();
  }, []);

  const OpenProfilePostModel = (post) => {
    setOpen(true);
    setData(post);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMute = () => {
    setMuted(!muted);
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  };

  return (
    <InfiniteScroll
      dataLength={postList.length}
      next={fethPostList}
      hasMore={hasMore}
      loader={
        <div className="h-[150px] w-full flex justify-center">
          <RotatingLines
            visible={true}
            className
            height="40px"
            width="40px"
            strokeColor="#3b82f6"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      }
      endMessage={
        <p className="py-2 text-center">
          <b>You have seen it all</b>
        </p>
      }
      scrollableTarget="mainDiv"
    >
      <div className="postDiv grid grid-cols-3 gap-1 sm:grid-cols-3 md:grid-cols-3 px-1">
        {postList &&
          postList.length > 0 &&
          postList.map((post) => (
            <div key={post.postId} onClick={() => OpenProfilePostModel(post)}>
              <div
                className="relative flex items-center h-full w-full"
                key={post.postId}
              >
                <video
                  className="object-cover object-center w-full h-[400px]  max-w-full  min-h-full "
                  autoPlay
                  muted={muted}
                >
                  <source
                    src={`data:video/${post.postUrls[0].filetype.substring(
                      1
                    )};base64,${post.postUrls[0].base64}`}
                    // type="video/mp4"
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
            </div>
            /* <PostVideo
                fileType={post.postUrls[0].fileType}
                base64={post.postUrls[0].base64}
              /> */
          ))}
        {open && (
          <MyPostsModel handleClose={handleClose} open={open} post={data} />
        )}
      </div>
    </InfiniteScroll>
  );
};

export default Reels;
