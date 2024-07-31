import React, { useEffect, useState } from "react";
import "./Home.css";
import HomeLayout from "../../layouts/HomeLayout";
import prof1 from "../../assets/Profile/1.png";
import prof2 from "../../assets/Profile/2.png";
import prof3 from "../../assets/Profile/3.png";
import prof4 from "../../assets/Profile/4.png";
import prof5 from "../../assets/Profile/5.png";
import prof6 from "../../assets/Profile/6.png";
import prof7 from "../../assets/Profile/7.png";
import prof9 from "../../assets/Profile/9.png";
import prof10 from "../../assets/Profile/10.png";
import prof11 from "../../assets/Profile/11.png";
import { Avatar, Badge, IconButton } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Height } from "@mui/icons-material";
import StoryModal from "../../components/home/story/StoryModal";
import {
  getOtherStory,
  getStory,
  useSelectorProfileState,
} from "../../redux/slices/ProfileSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const { profilePicture } = useSelectorProfileState();
  const dispatch = useDispatch();
  const [storyList, setStoryList] = useState([]);
  const [storyData, setStoryData] = useState([]);
  const [userStory, setUserStory] = useState([]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  useEffect(() => {
    const fetchMyStory = async () => {
      const res = await dispatch(getStory());
      if (res.payload.isSuccess) {
        setUserStory(res.payload.data);
      }
    };
    const fetchfollowigStoryList = async () => {
      const res = await dispatch(
        getOtherStory({ PageNumber: 1, PageSize: 10 })
      );
      if (res.payload.isSuccess) {
        setStoryList(res.payload.data.data);
      }
    };
    fetchfollowigStoryList();
    fetchMyStory();
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);
  const openStoryModal = (story) => {
    setStoryData(story);
    setIsOpen(true);
  };

  const [mymodalIsOpen, setMymodalIsOpen] = useState(false);
  const openMyStoryModal = () => {
    setMymodalIsOpen(true);
  };
  function closeStoryModal() {
    setIsOpen(false);
    setMymodalIsOpen(false);
  }

  return (
    <div className="w-[50%] mx-auto py-3">
      <Carousel
        responsive={responsive}
        itemClass="carousel-item-padding-700-px"
      >
        {userStory && userStory.length > 0 && (
          <button type="button" onClick={() => openMyStoryModal()}>
            <Avatar
              className="w-16 h-16 border-2 border-gray-300 dark:border-gray-500"
              src={profilePicture}
              alt="Bordered avatar"
            />
          </button>
        )}

        {storyList &&
          storyList.length > 0 &&
          storyList.map((story) => (
            <button
              type="button"
              onClick={() => openStoryModal(story)}
              key={story.userId}
            >
              <Avatar
                className="w-16 h-16 border-2 border-gray-300 dark:border-gray-500"
                src={`data:image/${story.fileType};base64,${story.profilePictureUrl}`}
                alt="Bordered avatar"
              />
            </button>
          ))}
      </Carousel>

      {modalIsOpen > 0 && (
        <StoryModal
          closeStoryModal={closeStoryModal}
          modalIsOpen={modalIsOpen}
          storyData={storyData}
        />
      )}

      {mymodalIsOpen && (
        <StoryModal
          closeStoryModal={closeStoryModal}
          modalIsOpen={mymodalIsOpen}
          userStory={userStory}
        />
      )}
    </div>
  );
};

export default Header;
