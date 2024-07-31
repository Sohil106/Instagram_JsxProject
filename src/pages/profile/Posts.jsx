import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostList } from "../../redux/slices/ProfileSlice";
import { RotatingLines } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import MyPostsModel from "../../components/profile/MyPostsModel";

const Posts = ({ userId }) => {
  const dispatch = useDispatch();
  const [postList, setPostList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   setPageNumber(1);
  // },[pageNumber])

  const fethPostList = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await dispatch(
        getPostList({
          userId: userId,
          postListType: 0,
          PageNumber: pageNumber,
          PageSize: 6,
        })
      );
      if (res.payload.isSuccess) {
        const requiredPage = res.payload.data.requiredPage;

        if (requiredPage >= pageNumber) {
          const newPostData = res.payload.data.data;
          // if (pageNumber === 1) {
          //   setPostList(newPostData);
          // } else {
          setPostList((prevPostData) => [...prevPostData, ...newPostData]);
          // }
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

  return (
    // style={{ height: "calc(100vh - 100px)", overflowY: "auto" }}
    <div>
      <InfiniteScroll
        dataLength={postList.length}
        next={fethPostList}
        // height="calc(100vh - 100px)"
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
        <div className="postDiv grid grid-cols-3 gap-1 sm:grid-cols-3 md:grid-cols-3 px-1">
          {postList &&
            postList.length > 0 &&
            postList.map((post) => (
              <div
                className="flex items-center h-full w-full"
                key={post.postId}
                onClick={() => OpenProfilePostModel(post)}
              >
                {post.postUrls[0].postTypeId == 1 && (
                  <img
                    className="object-cover object-center w-full h-[400px] max-w-full  min-h-full"
                    src={`data:image/${post.postUrls[0].filetype};base64,${post.postUrls[0].base64}`}
                    alt="gallery-photo"
                  />
                )}
                {post.postUrls[0].postTypeId == 2 && (
                  <video
                    className="object-cover object-center w-full h-[400px]  max-w-full  min-h-full"
                    autoPlay
                    playsInline
                    loop
                  >
                    <source
                      src={`data:video/${post.postUrls[0].filetype.substring(
                        1
                      )};base64,${post.postUrls[0].base64}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                )}

                {postList.length <= 0 && "No Post Added Yet"}
              </div>
            ))}
          {open && (
            <MyPostsModel handleClose={handleClose} open={open} post={data} />
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
