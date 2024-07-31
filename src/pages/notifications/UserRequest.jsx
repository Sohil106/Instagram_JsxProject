import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { acceptOrRemoveRequest } from "../../redux/slices/ProfileSlice";
import FollowRequestButton from "../profile/FollowRequestButton";

const UserRequest = ({ user, fethRequestList }) => {
  const dispatch = useDispatch();
  const [isAccept, setIsAccept] = useState(false);
  const [isNotRemove, setIsNotRemove] = useState(true);

  const acceptRequest = async (requestId) => {
    const res = await dispatch(
      acceptOrRemoveRequest({ requestId: requestId, isAccepted: true })
    );
    if (res.payload.isSuccess) {
      setIsAccept(true);
    }
    fethRequestList();
  };

  const deleteRequest = async (requestId) => {
    const res = await dispatch(
      acceptOrRemoveRequest({ requestId: requestId, isAccepted: false })
    );
    if (res.payload.isSuccess) {
      setIsNotRemove(false);
    }
    fethRequestList();
  };
  return (
    <>
      {isNotRemove && (
        <div className="">
          <div className="flex justify-between mt-2">
            <div className="flex gap-2">
              <div className="flex items-center min-w-fit">
                <img
                  src={`data:image/${user.fileType};base64,${user.profilePictureUrl}`}
                  // src={profiledemo}
                  alt="profile"
                  className="rounded-full w-8 "
                />
              </div>
              <div>
                <p>{user.userName}</p>
                <p>{user.name}</p>
                <p className="text-gray-400"></p>
              </div>
            </div>

            <div className="flex gap-2">
              {isAccept ? (
                <FollowRequestButton
                  userId={user.userId}
                  isPrivate={user.isPrivate}
                  isRequest={user.isRequest}
                  isFollowing={user.isFollowing}
                  isFollowBack={user.isFollowBack}
                  className="bg-blue-500 text-white rounded-md font-semibold px-4 py-0 mt-4md:mt-0"
                />
              ) : (
                <button
                  className="bg-blue-500 text-white rounded-md font-semibold px-4 py-0 mt-4md:mt-0"
                  onClick={() => acceptRequest(user.requestId)}
                >
                  Confirm
                </button>
              )}

              {isAccept ? (
                <></>
              ) : (
                <button
                  className="bg-zinc-100 rounded-md font-semibold px-3"
                  onClick={() => deleteRequest(user.requestId)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRequest;
