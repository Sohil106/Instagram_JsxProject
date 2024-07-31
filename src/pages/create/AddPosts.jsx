import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {
  addOrRemoveStory,
  addPosts,
  getotherUserData,
  getUserData,
} from "../../redux/slices/ProfileSlice";
import { TbSlideshow } from "react-icons/tb";
import { MdOutlineSlideshow } from "react-icons/md";
import AddPostCarousel from "./AddPostCarousel";
import { IoLocation } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { decodeToken } from "../../utils/AuthService";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddPosts = ({ handleClose, fileValues, header }) => {
  // const [error, setError] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  // const dispatch = useDispatch();
  const [fileBase64, setFileBase64] = useState([]);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState([]);
  const token = decodeToken();
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  // const handleFileChange = async (e) => {
  //   const selectedFiles = Array.from(e.target.files);

  //   if (selectedFiles.length === 0) {
  //     setSuccessMessage("");
  //     setError("File is required.");
  //     return;
  //   }
  //   let hasInvalidFile = false;
  //   const allowedTypes = [
  //     "image/jpeg",
  //     "image/png",
  //     "image/gif",
  //     "video/mp4",
  //     "video/webm",
  //   ];

  //   selectedFiles.forEach((file) => {
  //     if (!allowedTypes.includes(file.type)) {
  //       setError("Only image and video files are allowed.");
  //       setSuccessMessage("");
  //       hasInvalidFile = true;
  //       return;
  //     }
  //     if (file.type.startsWith("image/") && file.size > 1024 * 1024 * 1) {
  //       // 1 MB for images
  //       setError("Image files must not be greater than 1 MB.");
  //       setSuccessMessage("");
  //       hasInvalidFile = true;
  //       return;
  //     }
  //     if (file.type.startsWith("video/") && file.size > 1024 * 1024 * 5) {
  //       // 5 MB for videos
  //       setError("Video files must not be greater than 5 MB.");
  //       setSuccessMessage("");
  //       hasInvalidFile = true;
  //       return;
  //     }
  //   });

  //   if (hasInvalidFile) {
  //     setSuccessMessage("");
  //     return;
  //   }

  //   setError("");

  //   const formData = new FormData();
  //   selectedFiles.forEach((file) => {
  //     formData.append("InputFile", file);
  //   });
  //   console.log(formData);
  //   const res = await dispatch(addPosts(formData));

  //   if (res.payload.isSuccess) {
  //     setSuccessMessage("Uploaded Successfully");
  //   }
  // };

  useEffect(() => {
    const getBase64 = () => {
      // var file = e.target.files[0]
      const filesArray = Array.from(fileValues);
      filesArray.forEach((fileValue, index) => {
        let reader = new FileReader();
        reader.readAsDataURL(fileValue);
        reader.onload = () => {
          const newValue = reader.result;
          setFileBase64((prevValue) => [...prevValue, newValue]);
          // this.setState({
          //   imgUpload: reader.result
          // })
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      });
    };

    const fetchUserData = async () => {
      try {
        const res = await dispatch(getUserData(token.UserId));
        if (res.payload.isSuccess) {
          setUserDetails(res.payload.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getBase64();
    fetchUserData();
  }, [fileValues, dispatch]);

  const handleShare = async () => {
    const formData = new FormData();
    const filesArray = Array.from(fileValues);
    let res;
    if (header == "story") {
      filesArray.forEach((file) => {
        formData.append("InputFile", file);
      });
      formData.append("Caption", caption);

      res = await dispatch(addOrRemoveStory(formData));
    } else {
      filesArray.forEach((file) => {
        formData.append("InputFile", file);
      });
      formData.append("Caption", caption);
      formData.append("Location", location);

      if (header === "reel") {
        console.log("reel");
        formData.append("IsReel", true);
      }

      res = await dispatch(addPosts(formData));
    }

    if (res.payload.isSuccess) {
      navigate(AllRoutes.Profile);
    }
    // console.log("Location:", location);
    // console.log("Files (Base64):", fileValues);
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex justify-between items-center font-semibold py-2 bg-pink-500">
          <IconButton
            sx={{ color: "white" }}
            className="text-3xl ms-1 text-white"
            onClick={handleClose}
          >
            <IoMdClose />
          </IconButton>
          <div className="text-white">Add new {header}</div>
          <button className="text-blue-800 me-2" onClick={handleShare}>
            Share
          </button>
        </div>
        <div className="border-b-2"></div>
        <div className="grid grid-cols-2">
          <div className="flex justify-center items-center w-fit border-r-2">
            <AddPostCarousel PostUrls={fileBase64} />
            {/* // fileBase64.map((file, index) => (
              //     <img key={index} src={file} />
              // )) */}
          </div>
          <div className="ps-4 h-96 flex flex-col  gap-4 text-gray-500 ">
            <div className="mt-3 flex gap-4">
              <div className="flex items-center min-w-fit">
                <img
                  src={`data:image/${userDetails.fileType || "jpeg"};base64,${
                    userDetails.profilePictureUrl || ""
                  }`}
                  alt="profile"
                  className="rounded-full w-8"
                />
              </div>
              <div className="font-semibold flex items-center">
                <p>{userDetails.userName}</p>
              </div>
            </div>
            <div>
              <textarea
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write Caption..."
                className="w-full  rounded border-b-2 border-gray-300 focus:outline-none focus:border-gray-300"
                rows="4"
              ></textarea>
            </div>
            {header !== "story" && (
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Add Location"
                  className="ps-8 w-full  rounded border-b-2  border-gray-300 focus:outline-none focus:border-gray-300"
                />
                <IoLocation className="absolute text-2xl bottom-1" />
              </div>
            )}

            {/* {error.length > 0 && <div className="text-red-700">{error}</div>}
            {successMessage.length > 0 && (
              <div className="text-green-700">{successMessage}</div>
            )} */}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AddPosts;
