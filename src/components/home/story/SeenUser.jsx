import React, { useEffect, useState } from "react";
import { getIndProfilePicture } from "../../../redux/slices/ProfileSlice";
import { useDispatch } from "react-redux";
import { Avatar } from "@mui/material";

const SeenUser = ({ seenUser }) => {
  const dispatch = useDispatch();
  const [indProfilePic, setIndProfilePic] = useState("");

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const res = await dispatch(getIndProfilePicture(seenUser.userId));
      setIndProfilePic(res.payload);
    };
    fetchProfilePicture();
  }, []);
  return (
    <div>
      <div className="header flex justify-between items-center p-3 bg-transparent">
        <div className="flex items-center gap-2">
          <div className="profile">
            <Avatar
              className="w-12 h-12 border-2 border-gray-300 dark:border-gray-500"
              // src={indProfilePic}
              src={indProfilePic ? indProfilePic : ""}
              alt="Bordered avatar"
            />
          </div>
          <div>
            <div className="userName font-semibold">{seenUser.userName}</div>
            <div className="caption">{seenUser.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeenUser;
