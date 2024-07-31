import React, { useState } from "react";
import "./HomeLayout.css";
import { SideNavbar } from "../components/SideNavbar/SideNavbar";
import LoginFooter from "../components/shared/LoginFooter";
import SideNotificationBar from "../components/SideNavbar/SideNotificationBar";
import SideNotificationBar2 from "../components/SideNavbar/SideNotificationBar2";
import Search from "../pages/search/Search";
import AddPosts from "../pages/create/AddPosts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarOpen2, setSidebarOpen2] = useState(false);
  const [searchBar, setSearchbar] = useState(false);
  const [addPostModal, setAddPostModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [header, setHeader] = useState(null);
  const [error, setError] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setSidebarOpen2(false);
    setSearchbar(false);
  };
  const openSidebar2 = () => {
    setSidebarOpen2(true);
    setSidebarOpen(!sidebarOpen);
    setSearchbar(false);
  };
  const closeSidebar2 = () => {
    setSidebarOpen2(false);
    setSidebarOpen(!sidebarOpen);
  };
  const toggleSearchBar = () => {
    setSearchbar(!searchBar);
    setSidebarOpen2(false);
    setSidebarOpen(false);
  };

  const handleOpenPostModel = (values, typeOfUpload) => {
    if (values && values.length > 0) {
      let hasInvalidFile = false;
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "video/webm",
      ];

      const selectedFiles = Array.from(values);

      selectedFiles.forEach((file) => {
        if (!allowedTypes.includes(file.type)) {
          setError("Only image and video files are allowed.");
          hasInvalidFile = true;
          toast.error("Only image and video files are allowed.");
          return;
        }
        if (file.type.startsWith("image/") && file.size > 1024 * 1024 * 1) {
          // 1 MB for images
          setError("Image files must not be greater than 1 MB.");
          toast.error("Image files must not be greater than 1 MB.");
          hasInvalidFile = true;
          return;
        }
        if (file.type.startsWith("video/") && file.size > 1024 * 1024 * 5) {
          // 5 MB for videos
          setError("Video files must not be greater than 5 MB.");
          toast.error("Video files must not be greater than 5 MB.");
          hasInvalidFile = true;
          return;
        }
      });

      if (hasInvalidFile) {
        return;
      }

      setError("");

      setAddPostModal(true);
      setFiles(values);
      setHeader(typeOfUpload);
    }
  };

  const handleClosePostModel = () => {
    setAddPostModal(false);
  };

  return (
    <div>
      <ToastContainer position="top-right" />
      <div className="w-full min-w-full">
        <SideNavbar
          toggleSidebar={toggleSidebar}
          toggleSearchBar={toggleSearchBar}
          handleAddPostModel={handleOpenPostModel}
        />
        {sidebarOpen && <SideNotificationBar openSidebar2={openSidebar2} />}
        {sidebarOpen2 && <SideNotificationBar2 closeSidebar2={closeSidebar2} />}
        {searchBar && <Search />}

        {addPostModal && (
          <AddPosts
            fileValues={files}
            header={header}
            handleClose={handleClosePostModel}
          />
        )}

        <div className="" style={{ marginLeft: "100px" }}>
          {children}
        </div>
      </div>
      <div className="absolute bottom-0 text-center w-full">
        {/* <LoginFooter/> */}
      </div>
    </div>
  );
};

export default HomeLayout;
