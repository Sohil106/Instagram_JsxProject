import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { decodeToken } from "../../utils/AuthService";
import { MdDelete } from "react-icons/md";
import { button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { removeComment } from "../../redux/slices/ProfileSlice";

const CommentList = ({ eachcomment, deleteComment }) => {
  const token = decodeToken();
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setUserId(token.UserId);
  }, []);
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="flex items-center min-w-fit">
          <Avatar
            src={`data:image/${
              eachcomment.profilePictureFiletype || "jpeg"
            };base64,${eachcomment.profilePictureBase64 || ""}`}
          />
        </div>
        <div>
          <p>
            <span className="font-semibold">{eachcomment.username} </span>
            {eachcomment.comment}
          </p>
          <div className="flex gap-2">
            <span>3h</span>
            <span>11 likes</span>
            <span>Replay</span>
          </div>
        </div>
      </div>
      {eachcomment.userId == userId ? (
        <button onClick={() => deleteComment(eachcomment.commentId)}>
          <MdDelete className="text-2xl" />
        </button>
      ) : (
        <div>
          <CiHeart className="text-2xl" />
        </div>
      )}
    </div>
  );
};

export default CommentList;
