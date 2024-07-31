import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, CircularProgress } from "@mui/material";
import Post from "./Post";
import Header from "./Header";
import Footer from "./Footer";
import Story from "./Story";
import { useDispatch } from "react-redux";
import { getHomePagePostList } from "../../redux/slices/ProfileSlice";
import CommentsModal from "../../components/shared/CommentsModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { RotatingLines } from "react-loader-spinner";

const Explore = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [postOpen, setPostOpen] = useState(false);
  const [pid, setPId] = useState(null);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await dispatch(
        getHomePagePostList({ PageNumber: pageNumber, PageSize: 5 })
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
    fetchData();
  }, []);

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
    <InfiniteScroll
      dataLength={postList.length}
      next={fetchData}
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
    >
      <div className="explore-container">
        <Header />
        <Grid container spacing={2} p={2} className="flex justify-center">
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {postList.length > 0 &&
                postList.map((post) => (
                  <Grid item xs={12} key={post.postId}>
                    {/* <Post
                      data={post}
                      handlePostOpen={() => handlePostOpen(post.postId)}
                    /> */}
                    <Post
                      data={post}
                      handlePostOpen={() => handlePostOpen(post.postId)}
                    />
                  </Grid>
                  //    <Grid item xs={12} key={post.postId}>
                  //    {/* <Post
                  //      data={post}
                  //      handlePostOpen={() => handlePostOpen(post.postId)}
                  //    /> */}
                  //    {post.postUrls.some(
                  //      (postUrl) => postUrl.postTypeId !== 3
                  //    ) && (
                  //      <Post
                  //        data={post}
                  //        handlePostOpen={() => handlePostOpen(post.postId)}
                  //      />
                  //    )}
                  //  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
        {postOpen && (
          <CommentsModal handleClose={handlePostClose} postId={pid} />
        )}

        <Footer />
      </div>
    </InfiniteScroll>
  );
};

export default Explore;
