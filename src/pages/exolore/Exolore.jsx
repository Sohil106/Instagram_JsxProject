import React, { useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getHomePagePostList } from "../../redux/slices/ProfileSlice";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { RotatingLines } from "react-loader-spinner";
import { CircularProgress } from "@mui/material";
import MyPostsModel from "../../components/profile/MyPostsModel";
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

const Exolore = () => {
  const [postList, setPostList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await dispatch(
        getHomePagePostList({ PageNumber: pageNumber, PageSize: 6 })
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

  const OpenProfilePostModel = (post) => {
    setOpen(true);
    setData(post);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <HomeLayout>
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
        // height={1000}
      >
        <ImageList cols={3}>
          {postList &&
            postList.length > 0 &&
            postList.map((post) => (
              <ImageListItem
                key={post.postId}
                onClick={() => OpenProfilePostModel(post)}
              >
                {post.postUrls[0].postTypeId === 1 && (
                  <img
                    srcSet={`data:image/${post.postUrls[0].filetype};base64,${post.postUrls[0].base64}`}
                    src={`data:image/${post.postUrls[0].filetype};base64,${post.postUrls[0].base64}`}
                    // alt={item.title}
                    loading="lazy"
                    className="object-cover object-center w-full h-[400px] max-h-[400px] max-w-full  min-h-full"
                  />
                )}
                {(post.postUrls[0].postTypeId === 2 ||
                  post.postUrls[0].postTypeId === 3) && (
                  <video
                    loop
                    autoPlay
                    muted
                    className="object-cover object-center w-full h-[400px] max-h-[400px]  max-w-full  min-h-full"
                  >
                    <source
                      src={`data:video/${post.postUrls[0].filetype.substring(
                        1
                      )};base64,${post.postUrls[0].base64}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
                {/* {post.postUrls[0].postTypeId === 3 && (
                  <video
                    loop
                    autoPlay
                    muted
                    className="object-cover object-center w-full h-[400px]  max-w-full  min-h-full"
                  >
                    <source
                      src={`data:video/${post.postUrls[0].filetype.substring(
                        1
                      )};base64,${post.postUrls[0].base64}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                )} */}
              </ImageListItem>
            ))}
          {open && (
            <MyPostsModel handleClose={handleClose} open={open} post={data} />
          )}
        </ImageList>
      </InfiniteScroll>
    </HomeLayout>
  );
};

export default Exolore;
