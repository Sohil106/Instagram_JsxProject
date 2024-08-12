import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { MdOutlineSlideshow } from "react-icons/md";
import profiledemo from "../../assets/images/profiledemo.jpg";
import { BsThreeDots } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import { CgOverflow } from "react-icons/cg";
import { useDispatch } from "react-redux";
import {
  addOrUpdateComment,
  getPost,
  removeComment,
  useSelectorProfileState,
} from "../../redux/slices/ProfileSlice";
import { CiHeart } from "react-icons/ci";
import prof1 from "../../assets/Profile/1.png";
import { Avatar } from "@mui/material";
import CommentList from "./CommentList";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
};
const CommentsModal = ({ handleClose, postId }) => {
  const dispatch = useDispatch();
  const [postData, setPostdata] = useState([]);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const { profilePictureBase64, profilePictureFiletype } =
    useSelectorProfileState();

  useEffect(() => {
    const fetchPostData = async () => {
      const res = await dispatch(getPost(postId));
      if (res.payload.isSuccess) {
        setPostdata(res.payload.data);
        setPostComments(res.payload.data.postComments);
      }
    };
    fetchPostData();
  }, [postId]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    const res = await dispatch(
      addOrUpdateComment({
        postId: postId,
        comment: comment,
      })
    );

    if (res.payload.isSuccess) {
      setPostComments((prev) => {
        const newData = res.payload.data;

        newData.profilePictureBase64 = profilePictureBase64;
        newData.profilePictureFiletype = profilePictureFiletype;
        newData.username = postData.username;
        return [...prev, newData];
      });
      // const res1 = await dispatch(getPost(postId));
      // if (res1.payload.isSuccess) {
      //   setPostdata(res1.payload.data);
      //   setPostComments(res1.payload.data.postComments);
      // }
    }

    setComment("");
  };

  const deleteComment = async (commentId) => {
    const res = await dispatch(removeComment(commentId));
    if (res.payload.isSuccess) {
      setPostComments((prevData) => {
        return prevData.filter((userData) => userData.commentId !== commentId);
      });
      // const res1 = await dispatch(getPost(postId));
      // if (res1.payload.isSuccess) {
      //   setPostdata(res1.payload.data);
      //   setPostComments(res1.payload.data.postComments);
      // }
    }
  };
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="child2-modal-title"
      aria-describedby="child2-modal-description"
    >
      <Box sx={style}>
        <div className="header flex justify-between py-3 px-3 border-b-2">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div className="flex items-center min-w-fit">
                <Avatar
                  src={`data:image/${
                    postData.profilePictureFiletype || "jpeg"
                  };base64,${postData.profilePictureBase64 || ""}`}
                />
              </div>
              <div>
                <div className="flex gap-2">
                  <p className="font-semibold">{postData.username}</p>
                  <button className="text-blue-500">Follow </button>
                </div>

                <p>{postData.location}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center text-2xl">
            <BsThreeDots />
          </div>
        </div>

        <div className="content flex flex-col gap-3 h-96  text-gray-500 overflow-y-auto py-2 px-3">
          {postComments.map((eachcomment) => (
            <CommentList
              eachcomment={eachcomment}
              deleteComment={deleteComment}
              key={eachcomment.commentId}
            />
          ))}
        </div>

        <div
          className="footer border-t absolute bottom-0 py-2 w-full flex justify-center items-center gap-3 bg-white"
          style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
        >
          <div className="ms-4 text-xl ">
            <BsEmojiSmile />
          </div>
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full py-2 rounded  border-gray-300 focus:outline-none focus:border-gray-300"
            value={comment}
            onChange={handleCommentChange}
          />
          {comment && (
            <button
              className="me-4 text-blue-500 font-semibold"
              onClick={handleCommentSubmit}
            >
              Post
            </button>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default CommentsModal;
