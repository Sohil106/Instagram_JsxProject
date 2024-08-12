import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Post from "../../pages/home/Post";
import CommentsModal from "../shared/CommentsModal";
import { useDispatch } from "react-redux";
import { getPost } from "../../redux/slices/ProfileSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "500px", // fixed height
  width: "600px", // fixed width
  maxHeight: "80vh", // max height
  maxWidth: "90vw", // max width
};
const MyPostsModel = ({ handleClose, open, post, deletehandler }) => {
  const [pid, setPId] = useState(null);
  const [postOpen, setPostOpen] = useState(false);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();

  const handlePostOpen = () => {
    console.log(post.postId);
    if (post.postId) {
      setPId(post.postId);
      setPostOpen(true);
    }
  };

  const handlePostClose = () => {
    setPostOpen(false);
  };

  const fetchUserData = async () => {
    const res = await dispatch(getPost(post.postId));
    if (res.payload.isSuccess) {
      setUserData(res.payload.data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [post.postId, dispatch]);

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

  const closePostHandler = () => {
    handleClose();
  };
  return (
    <>
      {userData && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={style}>
            <Post
              data={userData}
              handlePostOpen={handlePostOpen}
              deletehandler={deletehandler}
              closePostHandler={closePostHandler}
            />
            {postOpen && (
              <CommentsModal handleClose={handlePostClose} postId={pid} />
            )}
          </Box>
        </Modal>
      )}
    </>
  );
};

export default MyPostsModel;
