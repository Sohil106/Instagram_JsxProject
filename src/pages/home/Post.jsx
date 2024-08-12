import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  Instagram,
  Favorite,
  Comment,
  Share,
  Home,
  Search,
  ArrowBack,
} from "@mui/icons-material";
import HomeLayout from "../../layouts/HomeLayout";
import { BsHeartFill, BsThreeDots } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { SlShare } from "react-icons/sl";
import { MdOutlineTurnedInNot } from "react-icons/md";
import PostCarousel from "./PostCarousel";
import { useDispatch } from "react-redux";
import { addOrRemovePostLike, getPost } from "../../redux/slices/ProfileSlice";
import { decodeToken } from "../../utils/AuthService";
import EditDeletePost from "../../components/profile/EditDeletePost";

const Post = ({ data, handlePostOpen, deletehandler, closePostHandler }) => {
  // const [count,PostCount] = useState(Post);
  const user = decodeToken();
  const [isLiked, setIsLiked] = useState(
    !!data.postLikes.find(
      (item) => item.userId.toString() === user.UserId.toString()
    )
  );
  const dispatch = useDispatch();
  const [likesCount, setLikesCount] = useState(
    Array.isArray(data.postLikes) ? data.postLikes.length : 0
  );
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [pId, setPId] = useState();

  // useEffect(() => {
  //   console.log(data.postLikes)
  //   console.log(!!data.postLikes.find((item)=>item.userId.toString() === user.UserId.toString()))
  // }, [])

  const handleLike = async (postId) => {
    setIsLiked(!isLiked);
    const res1 = await dispatch(addOrRemovePostLike(postId));
    if (res1.payload.isSuccess) {
      if (isLiked) {
        setLikesCount(likesCount - 1);
      } else {
        setLikesCount(likesCount + 1);
      }
      // const res2 = await dispatch(getPost(postId))
      // if(res2.payload.isSuccess){
      //   setLikesCount(Array.isArray(res2.payload.data.postLikes) ? res2.payload.data.postLikes.length : 0)
      // }
    }
  };
  const handlePopUP = (postId) => {
    setPId(postId);
    setPopUpOpen(true);
  };
  const closePopUp = () => {
    closePostHandler();
    setPopUpOpen(false);
  };

  return (
    <Card className="post-card shadow-none">
      <CardContent>
        <Grid
          container
          alignItems="center"
          className="flex justify-between"
          spacing={2}
        >
          <Grid item className="flex">
            <Grid className="flex gap-2 items-center">
              <Avatar
                src={`data:image/${data.profilePictureFiletype};base64,${data.profilePictureBase64}`}
              />
              <Grid className="">
                <p className="font-semibold">{data.username}</p>
                <p>{data.location}</p>
              </Grid>
            </Grid>
          </Grid>
          {user.UserId.toString() === data.userId.toString() && (
            <Grid item className="flex items-center text-2xl">
              <IconButton onClick={() => handlePopUP(data.postId)}>
                <BsThreeDots />
              </IconButton>
            </Grid>
          )}
        </Grid>
        <PostCarousel PostUrls={data.postUrls} />
      </CardContent>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className="px-2"
      >
        <Box>
          <IconButton
            onClick={() => handleLike(data.postId)}
            color={isLiked ? "primary" : "default"}
          >
            {isLiked ? <BsHeartFill className="text-red-600" /> : <BsHeart />}
          </IconButton>
          <IconButton onClick={handlePostOpen}>
            <FaRegCommentAlt />
          </IconButton>
          <IconButton>
            <SlShare />
          </IconButton>
        </Box>
        <IconButton>
          <MdOutlineTurnedInNot className="text-3xl" />
        </IconButton>
        {popUpOpen && pId && (
          <EditDeletePost
            closePopUp={closePopUp}
            popUpOpen={popUpOpen}
            postId={pId}
            deletehandler={deletehandler}
          />
        )}
      </Box>
      <div className="px-4 font-semibold"> {likesCount} likes</div>
      <div className="px-4 font-semibold mt-2 mb-2">
        <span>{data.username} </span>{" "}
        <span className="font-normal">{data.caption}</span>
      </div>
      {/* <Divider /> */}
      {/* <TextField
        label="Add a comment..."
        fullWidth
        margin="normal"
        variant="standard"
        sx={{ paddingX: "15px" }}
        InputLabelProps={{
          sx: {
            marginLeft: "15px", // Adjust the margin as needed
          },
        }}
      /> */}
    </Card>
  );
};

export default Post;
