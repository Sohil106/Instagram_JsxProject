import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  AddorRemoveRequest,
  getUserData,
} from "../../redux/slices/ProfileSlice";

const FollowRequestButton = ({
  userId,
  isFollowing,
  isRequest,
  isPrivate,
  isFollowBack,
  styleClass,
}) => {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(false);
  const [requested, setRequested] = useState(false);
  const [privated, setPrivated] = useState(false);
  const [followBack, setFollowBack] = useState(false);

  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing]);

  useEffect(() => {
    setRequested(isRequest);
  }, [isRequest]);

  useEffect(() => {
    setPrivated(isPrivate);
  }, [isPrivate]);

  useEffect(() => {
    setFollowBack(isFollowBack);
  }, [isFollowBack]);

  const addOrRemoverRequest = async () => {
    try {
      const res = await dispatch(AddorRemoveRequest(userId));
      if (res.payload.isSuccess) {
        const res1 = await dispatch(getUserData(userId));
        console.log(res1);
        if (res1.payload.isSuccess) {
          setFollowing(res1.payload.data.isFollowing);
          setRequested(res1.payload.data.isRequest);
          setPrivated(res1.payload.data.isPrivate);
          setFollowBack(res1.payload.data.isFollowBack);
        }
      }
    } catch (error) {
      console.error("Error in addOrRemoverRequest:", error);
    }
  };

  return (
    <div>
      <p>{following}</p>

      {following ? (
        <button
          className={`${
            styleClass ? "border-2 border-white" : "bg-blue-500"
          } text-white rounded-md font-semibold px-4 py-1 mt-4md:mt-0`}
          onClick={addOrRemoverRequest}
          style={{ textShadow: `${styleClass ? "1px 1px 2px black" : ""}` }}
        >
          {" "}
          Following
        </button>
      ) : privated != null && privated != false ? (
        requested ? (
          <button
            className="bg-blue-500 text-white rounded-md font-semibold px-4 py-1 mt-4md:mt-0"
            onClick={addOrRemoverRequest}
          >
            {" "}
            Requested
          </button>
        ) : followBack ? (
          <button
            className="bg-blue-500 text-white rounded-md font-semibold px-4 py-1 mt-4md:mt-0"
            onClick={addOrRemoverRequest}
          >
            {" "}
            FollowBack
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white rounded-md font-semibold px-4 py-1 mt-4md:mt-0"
            onClick={addOrRemoverRequest}
          >
            {" "}
            Follow
          </button>
        )
      ) : followBack ? (
        <button
          className="bg-blue-500 text-white rounded-md font-semibold px-4 py-1 mt-4md:mt-0"
          onClick={addOrRemoverRequest}
        >
          {" "}
          FollowBack
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white rounded-md font-semibold px-4 py-1 mt-4md:mt-0"
          onClick={addOrRemoverRequest}
        >
          {" "}
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowRequestButton;
