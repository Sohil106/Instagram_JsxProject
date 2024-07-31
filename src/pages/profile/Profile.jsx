import React, { Children, useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { LuBadge } from "react-icons/lu";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { FaUserTag } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { PiSquaresFourLight } from "react-icons/pi";
import { Link, useLocation, useParams } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import Posts from "./Posts";
import Reels from "./Reels";
import Tagged from "./Tagged";
import {
  getIndProfilePicture,
  getMutualList,
  getPostList,
  getotherUserData,
  useSelectorProfileState,
} from "../../redux/slices/ProfileSlice";
import profiledemo from "../../assets/images/profiledemo.jpg";
import { decodeToken } from "../../utils/AuthService";
import EditProfile from "./EditProfile";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import FollowRequestButton from "./FollowRequestButton";
import FollowerFollowingModal from "./profile-modals/FollowerFollowingModal";
import Avatar from "@mui/material/Avatar";
export const Profile = () => {
  const id = location.pathname.split("/")[2];
  const { success, user, profilePicture, mutualList, mutualcount, postList } =
    useSelectorProfileState();
  const [otherProfilePicture, setOtherProfilePicture] = useState(null);
  const [otherUserData, setOtherUserData] = useState({});
  const dispatch = useDispatch();
  const authUser = decodeToken();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (id > 0 && id != null) {
        try {
          const res = await dispatch(getIndProfilePicture(id));
          if (res.payload) {
            setOtherProfilePicture(res.payload);
          }
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      }
    };
    const fetchUserData = async () => {
      if (id > 0 && id != null) {
        try {
          const res = await dispatch(getotherUserData(id));
          if (res.payload.isSuccess) {
            setOtherUserData(res.payload.data);
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    if (id != undefined) {
      dispatch(getMutualList({ userId: id }));
    }

    fetchProfilePicture();
    fetchUserData();
  }, [id, dispatch]);

  useEffect(() => {
    if (id > 0 && id != null) {
      setUserInfo(otherUserData);
    } else {
      setUserInfo(user);
    }
  }, [id, otherUserData, user]);

  // useEffect(() => {
  //   if (userInfo.userId != undefined) {
  //     const res = dispatch(getPostList({ userId: userInfo.userId }));
  //   }
  // }, [userInfo.userId]);

  const [openModal, setOpenModal] = useState({ type: "", open: false });

  const openFollowModal = (header) => {
    setOpenModal({
      type: header,
      open: true,
    });
  };

  const closeFollowModal = () => {
    setOpenModal({
      type: "",
      open: false,
    });
  };

  const [tab, setTab] = useState("posts");

  return (
    <HomeLayout>
      <div className=" py-6 max-w-full">
        <div className="part__1 flex items-center px-9 gap-12 mt-5">
          <div className="profile__image lg:px-12 flex items-center relative">
            <Avatar
              src={
                id
                  ? otherProfilePicture
                    ? otherProfilePicture
                    : profiledemo
                  : profilePicture
                  ? profilePicture
                  : profiledemo
              }
              alt=""
              className="rounded-full md:w-52 sm:w-40 md:h-52 sm:h-40 w-16 h-16"
            />
            <div className="absolute bottom-0 text-center w-full pt-5 sm:hidden">
              {userInfo.name}
            </div>
          </div>

          <div className="profile__content flex flex-col gap-3">
            <div className="md:flex gap-3 items-center">
              <div className="text-lg">{userInfo.userName}</div>
              <div className="flex gap-3 items-center">
                {userInfo.userId == authUser.UserId ? (
                  <Link
                    to={AllRoutes.EditProfile}
                    className="bg-zinc-100 rounded-md font-semibold px-3 py-1 mt-4md:mt-0"
                  >
                    Edit profile
                  </Link>
                ) : (
                  <FollowRequestButton
                    userId={id}
                    isPrivate={userInfo.isPrivate}
                    isRequest={userInfo.isRequest}
                    isFollowing={userInfo.isFollowing}
                    isFollowBack={userInfo.isFollowBack}
                  />
                )}
                {userInfo.userId == authUser.UserId ? (
                  <button className="bg-zinc-100 rounded-md font-semibold px-3 py-1 md:mt-0">
                    View archive
                  </button>
                ) : (
                  <button className="bg-zinc-100 rounded-md font-semibold px-3 py-1 md:mt-0">
                    Message
                  </button>
                )}

                <div className="md:flex hidden">
                  <LuBadge />
                </div>
              </div>
            </div>
            <div className="md:flex gap-8  hidden">
              <div>
                <span className="font-semibold">{userInfo.posts}</span>{" "}
                <span>Posts</span>
              </div>

              <div>
                <button onClick={() => openFollowModal("Followers")}>
                  <span className="font-semibold">{userInfo.followers} </span>
                  <span>followers</span>
                </button>
                {/* <FollowerList FollowersCount={userInfo.followers} userId = {userInfo.userId}/> */}
              </div>
              <button onClick={() => openFollowModal("Following")}>
                <span className="font-semibold">{userInfo.following} </span>
                <span>following</span>
              </button>
            </div>
            <div className="fullname__Bio md:block hidden">
              <div className="fullname font-semibold">{userInfo.name}</div>
              <div className="bio flex flex-col">
                <p>{userInfo.bio}</p>
              </div>
              <div>
                {userInfo.link && (
                  <a href={userInfo.link} target="_blank">
                    <div className="flex items-center gap-2 text-blue-900 font-semibold">
                      <FaLink />
                      <span>{userInfo.link}</span>
                    </div>
                  </a>
                )}
              </div>
            </div>
            {userInfo.userId != authUser.UserId &&
              mutualList != undefined &&
              mutualList.length > 0 && (
                <div>
                  <button
                    onClick={() => openFollowModal("Mutual")}
                    className="text-gray-600"
                  >
                    Followed by{" "}
                    <span className="font-semibold text-gray-900">
                      {mutualList
                        .slice(0, 2)
                        .map((item) => item.userName)
                        .join(",")}
                    </span>
                    {mutualcount > 2 && (
                      <span> and {mutualcount - 2} others</span>
                    )}
                  </button>
                </div>
              )}
          </div>
        </div>

        <div className="mt-5">
          <div className="border-t border-gray-200 dark:border-gray-700 flex justify-center">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="me-2">
                <button
                  onClick={() => setTab("posts")}
                  className={`inline-flex items-center justify-center p-4  ${
                    tab === "posts"
                      ? "text-blue-600 border-t-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-t-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  } group`}
                  aria-current="page"
                >
                  <PiSquaresFourLight className="text-xl me-1" /> POSTS
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => setTab("reels")}
                  className={`inline-flex items-center justify-center p-4 ${
                    tab === "reels"
                      ? "text-blue-600 border-t-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-t-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  } group`}
                >
                  <PiBookmarkSimpleLight className="text-xl me-1" /> REELS
                </button>
              </li>
              {/* <li className="me-2">
                <button
                  onClick={() => setTab("tagged")}
                  className={`inline-flex items-center justify-center p-4 ${
                    tab === "tagged"
                      ? "text-blue-600 border-t-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-t-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  } group`}
                >
                  <FaUserTag className="text-xl me-1" /> TAGGED
                </button>
              </li> */}
            </ul>
          </div>
          <div className="tab-content">
            {tab === "posts" && userInfo.userId && (
              <Posts userId={userInfo.userId} />
            )}
            {tab === "reels" && userInfo.userId && (
              <Reels userId={userInfo.userId} />
            )}
            {tab === "tagged" && <Tagged />}
          </div>
        </div>
      </div>

      {openModal.open && (
        <FollowerFollowingModal
          header={openModal.type}
          userId={userInfo.userId}
          handleOpen={openModal.open}
          handleClose={closeFollowModal}
        />
      )}
    </HomeLayout>
  );
};
