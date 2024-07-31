import { Height, Padding } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IoMdClock, IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  getIndProfilePicture,
  getProfilePicture,
  useSelectorProfileState,
} from "../../../redux/slices/ProfileSlice";
import { Avatar } from "@mui/material";
import StoryCarousel from "./StoryCarousel";
import LinearWithValueLabel from "./ProgressBar";
import store from "../../../redux/store";
import { decodeToken } from "../../../utils/AuthService";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
    width: 800,
    Height: 800,
  },
};

const StoryModal = ({ closeStoryModal, modalIsOpen, storyData, userStory }) => {
  const dispatch = useDispatch();
  // const [indProfilePic, setIndProfilePic] = useState("");
  const { profilePicture, user } = useSelectorProfileState();
  const token = decodeToken();
  const [caption, setCaption] = useState("");
  const [closeEye, setCloseEye] = useState(false);

  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalIsOpen]);

  const handleCaption = (usercaption) => {
    setCaption(usercaption);
  };

  const handleEye = () => {
    setCloseEye((current) => !current);
  };

  // useEffect(() => {
  //   if (storyData) {
  //     const fetchProfilePicture = async () => {
  //       const res = await dispatch(getIndProfilePicture(storyData.userId));
  //       setIndProfilePic(res.payload);
  //     };
  //     fetchProfilePicture();
  //   }
  // }, []);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeStoryModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false} // To avoid accessibility issues when testing
        shouldCloseOnOverlayClick={false} // Prevent closing on overlay click
      >
        <div className="relative" style={{ minHeight: "500px" }}>
          <div className="header flex justify-between items-center p-3 bg-transparent">
            <div className="flex items-center gap-2">
              <div className="profile">
                <Avatar
                  className="w-16 h-16 border-2 border-gray-300 dark:border-gray-500"
                  // src={indProfilePic}
                  src={
                    storyData
                      ? `data:image/${storyData.fileType};base64,${storyData.profilePictureUrl}`
                      : profilePicture
                  }
                  alt="Bordered avatar"
                />
              </div>
              <div>
                <div className="userName font-semibold">
                  {storyData ? storyData.userName : user.userName}
                </div>
                <div className="caption">{caption}</div>
              </div>
            </div>
            <div className="flex gap-2">
              {!storyData && (
                <button
                  className="text-2xl flex justify-center"
                  onClick={() => handleEye()}
                >
                  {closeEye ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}

              <div>
                <button onClick={closeStoryModal} className="text-2xl">
                  <IoMdClose />
                </button>
              </div>
            </div>
          </div>

          <div className="">
            {/* <div>
            {storyData.userId} {storyData.stories[0].filetype}
          </div>
          <video
            className="object-cover object-center w-full h-100 max-w-full  min-h-full p-0.5"
            autoPlay
            playsInline
            loop
            muted
          >
            <source
              src={`data:image/${storyData.stories[0].filetype};base64,${storyData.stories[0].storyBase64}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video> */}
            <StoryCarousel
              stories={storyData ? storyData.stories : userStory}
              handleCaption={handleCaption}
              closeEye={closeEye}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StoryModal;
