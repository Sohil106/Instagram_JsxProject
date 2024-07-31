import instaLogo from "../../assets/images/Instagram_logo.svg";
import "./SideNavbar.css";
import { FaInstagram } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { BiSolidSearch } from "react-icons/bi";
import { MdExplore } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { AiFillPlaySquare } from "react-icons/ai";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { PiMessengerLogoFill } from "react-icons/pi";
import { PiMessengerLogoBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { FaRegSquarePlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { logout, useSelectorUserState } from "../../redux/slices/AuthSlice";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import { useDispatch } from "react-redux";
import {
  getProfilePicture,
  getUserData,
  useSelectorProfileState,
} from "../../redux/slices/ProfileSlice";
import { useEffect, useState } from "react";
import { decodeToken } from "../../utils/AuthService";
import profiledemo from "../../assets/images/profiledemo.jpg";
import SideNotificationBar from "./SideNotificationBar";
import { Avatar, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

export const SideNavbar = ({
  toggleSidebar,
  toggleSearchBar,
  handleAddPostModel,
}) => {
  const { profilePicture, success } = useSelectorProfileState();
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const userData = decodeToken();
  const location = useLocation();
  const { pathname } = location;

  const [isActive, setIsActive] = useState(1);

  const LogoutHandler = () => {
    disPatch(logout());
    navigate(AllRoutes.Login);
  };

  const handleNavigation = (route, index) => {
    setIsActive(index);
    navigate(route);
  };

  useEffect(() => {
    switch (pathname) {
      case AllRoutes.Home:
        setIsActive(1);
        break;
      case AllRoutes.Explore:
        setIsActive(3);
        break;
      case AllRoutes.Reels:
        setIsActive(4);
        break;
      case AllRoutes.Messages:
        setIsActive(5);
        break;
      case AllRoutes.Notifications:
        setIsActive(6);
        break;
      case AllRoutes.Profile:
        setIsActive(8);
        break;
      default:
        setIsActive(1); // Default to Home
        break;
    }
  }, [pathname]);

  useEffect(() => {
    const res = disPatch(getProfilePicture(userData.UserId));
    const res1 = disPatch(getUserData(userData.UserId));
  }, []);

  return (
    <div
      className="sidenav flex flex-col justify-between z-200 border-e-2 min-h-screen w-24 "
      style={{ position: "fixed", height: "100vh", overflowY: "hidden" }}
    >
      <div className="sidenav_buttons flex flex-col">
        <Link to={AllRoutes.Home} className="sidenav_button mb-3">
          <FaInstagram />
        </Link>
        <button
          className={`sidenav_button mb-3 ${isActive == 1 ? "active" : ""}`}
          onClick={() => handleNavigation(AllRoutes.Home, 1)}
        >
          {isActive == 1 ? <GoHomeFill /> : <GoHome />}
        </button>
        <button
          className={`sidenav_button mb-3 ${isActive == 2 ? "active" : ""}`}
          onClick={() => {
            setIsActive(2);
            toggleSearchBar();
          }}
        >
          {isActive == 2 ? <BiSolidSearch /> : <BiSearch />}
        </button>
        <button
          className={`sidenav_button mb-3 ${isActive == 3 ? "active" : ""}`}
          onClick={() => handleNavigation(AllRoutes.Explore, 3)}
        >
          {isActive == 3 ? <MdExplore /> : <MdOutlineExplore />}
        </button>
        <button
          className={`sidenav_button mb-3 ${isActive == 4 ? "active" : ""}`}
          onClick={() => handleNavigation(AllRoutes.Reels, 4)}
        >
          {isActive == 4 ? <AiFillPlaySquare /> : <AiOutlinePlaySquare />}
        </button>
        <button
          className={`sidenav_button mb-3  ${isActive == 5 ? "active" : ""}`}
          onClick={() => handleNavigation(AllRoutes.Messages, 5)}
        >
          {isActive == 5 ? <PiMessengerLogoFill /> : <PiMessengerLogoBold />}
        </button>
        <button
          className={`sidenav_button mb-3 ${isActive == 6 ? "active" : ""}`}
          // to={AllRoutes.Notifications}
          // className={`sidenav_button mb-3 ${
          //   activeLink === AllRoutes.Notifications ? "active" : ""
          // }`}
          onClick={() => {
            setIsActive(6);
            toggleSidebar();
          }}
        >
          {isActive == 6 ? <FaHeart /> : <FaRegHeart />}
        </button>
        <div className={`paste-button ${isActive == 7 ? "active" : ""}`}>
          <div className="flex justify-center">
            <button
              className={`sidenav_button mb-3   ${
                isActive == 7 ? "active" : ""
              }`}
              onClick={() => {
                setIsActive(7);
              }}
            >
              {isActive == 7 ? <FaSquarePlus /> : <FaRegSquarePlus />}
            </button>
          </div>

          <div
            className="dropdown-content w-[8%] fixed"
            style={{ zIndex: "999" }}
          >
            <label id="top" htmlFor="post">
              Post
            </label>
            <input
              type="file"
              id="post"
              multiple
              hidden
              onChange={(e) => handleAddPostModel(e.target.files, "post")}
            />
            <label id="top" htmlFor="story">
              Story
            </label>
            <input
              type="file"
              id="story"
              hidden
              onChange={(e) => handleAddPostModel(e.target.files, "story")}
            />
            <label id="top" htmlFor="reel">
              Reel
            </label>
            <input
              type="file"
              id="reel"
              hidden
              onChange={(e) => handleAddPostModel(e.target.files, "reel")}
            />
          </div>
        </div>

        <button
          className={`sidenav_button mb-3 ${isActive == 8 ? "active" : ""}`}
          onClick={() => handleNavigation(AllRoutes.Profile, 8)}
        >
          <Avatar
            src={profilePicture ? profilePicture : profiledemo}
            alt="profile"
            className="w-6 h-6 "
          />
        </button>
      </div>

      <button className="sidenav_button" onClick={LogoutHandler}>
        <IoLogOutOutline />
      </button>
    </div>
  );
};
