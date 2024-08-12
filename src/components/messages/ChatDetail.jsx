import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { decodeToken } from "../../utils/AuthService";
import { useDispatch } from "react-redux";
import { getChatList, getUserData } from "../../redux/slices/ProfileSlice";
import profiledemo from "../../assets/images/profiledemo.jpg";
import chatConnection from "../../constants/chatConnection";

const ChatDetail = ({ handleSearchModal, newChat, openChatMessages }) => {
  const loggedInUser = decodeToken();
  const dispatch = useDispatch();
  const [loginUserData, setLoginUserData] = useState([]);
  const [chatList, setChatList] = useState([]);

  const fetchLoggedInUserData = async (userId) => {
    const res = await dispatch(getUserData(userId));
    if (res.payload.isSuccess) {
      setLoginUserData(res.payload.data);
    }
  };

  useEffect(() => {
    fetchLoggedInUserData(loggedInUser.UserId);
  }, [loggedInUser.UserId]);

  const fetchChatList = async () => {
    const res = await dispatch(getChatList());
    if (res.payload.isSuccess) {
      setChatList(res.payload.data.data);
    }
  };

  useEffect(() => {
    fetchChatList();
  }, []);

  useEffect(() => {
    setChatList((prevUserData) => {
      const existingUserData = prevUserData.find(
        (userData) => userData.chatId === newChat.chatId
      );
      if (existingUserData) return [...prevUserData];
      else return [...prevUserData, newChat];
    });
  }, [newChat]);

  useEffect(() => {
    const handleCreateChat = (newUserData) => {
      setChatList((prevUserData) => {
        // const existingUserData = prevUserData.find(
        //   (userData) => userData.notificationId === newUserData.notificationId
        // );
        // if (newUserData.isDeleted) {
        //   return prevUserData.filter(
        //     (userData) => userData.notificationId !== newUserData.notificationId
        //   );
        // } else {
        return [...prevUserData, newUserData];
        // }
      });
    };
    chatConnection.on("CreateChat", handleCreateChat);
  }, [chatConnection]);

  //to prevent drag
  const preventDragHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-6 border-b-2">
        <div className="font-bold">{loginUserData.userName}</div>
        <IconButton onClick={handleSearchModal}>
          <BiEdit className="text-3xl text-gray-800" />
        </IconButton>
      </div>
      <div className="flex justify-between px-4 py-3 ">
        <div className="font-bold text-gray-800">Messages</div>
        <div className="text-sm font-bold text-gray-500">Requests</div>
      </div>

      {chatList.length > 0 &&
        chatList.map((chat, index) => (
          <div
            className="listItem flex gap-2 px-3 py-2 hover:bg-gray-300"
            key={index}
            onClick={() => openChatMessages(chat.toUserId, chat.chatId)}
          >
            <Avatar
              src={`${
                chat.toUserProfilePictureFiletype
                  ? `data:image/${chat.toUserProfilePictureFiletype};base64,${chat.toUserProfilePictureBase64}`
                  : profiledemo
              }`}
              onDragStart={preventDragHandler}
            ></Avatar>
            <div>
              <p>{chat.toUserName}</p>
              <p className="text-xs text-gray-500">Active 1h ago</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatDetail;
