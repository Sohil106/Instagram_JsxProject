import { Avatar, Button, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getMessageList, getUserData } from "../../redux/slices/ProfileSlice";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import EmojiPicker from "emoji-picker-react";
import profiledemo from "../../assets/images/profiledemo.jpg";
import { decodeToken } from "../../utils/AuthService";
import chatConnection from "../../constants/chatConnection";
import { input } from "@material-tailwind/react";

const ChatMessages = ({ userId, chatId }) => {
  const [msgValue, setMsgValue] = useState("");
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const loginUserData = decodeToken();
  const inputRef = useRef();

  const handleMessageChange = (event) => {
    setMsgValue(event.target.value);
  };
  const handleEmojiClick = (emojiObject) => {
    setMsgValue((prevValue) => prevValue + emojiObject.emoji);
    setOpenEmoji(false);
  };

  const fetchUserData = async (userId) => {
    const res = await dispatch(getUserData(userId));
    if (res.payload.isSuccess) {
      setUserData(res.payload.data);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);

  const handleEmoji = () => {
    setOpenEmoji(true);
  };

  const fetchMessageList = async (chatId) => {
    const res = await dispatch(getMessageList(chatId));
    if (res.payload.isSuccess) {
      setMessageList(res.payload.data.data);
    }
  };
  useEffect(() => {
    fetchMessageList(chatId);
  }, [chatId]);

  //to prevent drag
  const preventDragHandler = (e) => {
    e.preventDefault();
  };

  const onSubmit = async () => {
    if (inputRef.current && inputRef.current.value) {
      const newMessage = await chatConnection.invoke(
        "SendMessage",
        `${userId}`,
        `${chatId}`,
        inputRef.current.value
      );
      setMessageList((prevList) => [...prevList, newMessage]);
    }
    setMsgValue("");
  };

  const handleReceiveMessage = (newUserData) => {
    setMessageList((prevUserData) => {
      return [...prevUserData, newUserData];
    });
  };
  useEffect(() => {
    chatConnection.on("ReceiveMessage", handleReceiveMessage);
  }, [chatConnection]);
  return (
    <div className="relative min-h-screen">
      <div className="header flex gap-2 border-b-2 p-3">
        <Avatar
          src={`${
            userData.fileType
              ? `data:image/${userData.fileType};base64,${userData.profilePictureUrl}`
              : profiledemo
          }`}
          onDragStart={preventDragHandler}
        ></Avatar>
        <div>
          <p>{userData.name}</p>
          <p className="text-xs text-gray-500">Active 1h ago</p>
        </div>
      </div>
      <div className="scroll-div">
        <div className="flex flex-col justify-center gap-3 items-center py-7">
          <Avatar
            src={`${
              userData.fileType
                ? `data:image/${userData.fileType};base64,${userData.profilePictureUrl}`
                : profiledemo
            }`}
            onDragStart={preventDragHandler}
            className="h-20 w-20"
          ></Avatar>
          <div className="text-center">
            <p className="font-semibold text-gray-900">{userData.name}</p>
            <p className="text-xs text-gray-500">
              {userData.userName} Instagram
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              className="normal-case bg-gray-300 text-gray-900 font-semibold py-1 px-2 text-xs hover:bg-gray-300"
              onClick={() => navigate(`/profile/${userId}`)}
            >
              View profile
            </Button>
          </div>

          <div className="messages-viewport w-full flex flex-col gap-4 mb-20">
            {messageList &&
              messageList.map((message) => (
                <div key={message.messageId}>
                  {message.fromUserId == loginUserData.UserId ? (
                    <div className="text-right ">
                      <span className="bg-blue-500 text-white rounded-full p-2 me-2">
                        {message.messageText}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="bg-gray-200 rounded-full p-2 ms-2">
                        {message.messageText}
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {openEmoji && (
          <div className="absolute bottom-16 right-2">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <div className="footer rounded-full absolute bottom-2 py-2 flex justify-center items-center gap-3 bg-white w-[100%]">
          <input
            type="text"
            placeholder="type a message..."
            className="ps-4 py-2 rounded-full w-full border-gray-300 focus:outline-none focus:border-gray-300"
            value={msgValue}
            onChange={handleMessageChange}
            ref={inputRef}
          />
          <IconButton className="right-0 me-4 text-xl " onClick={handleEmoji}>
            <BsEmojiSmile />
          </IconButton>
          {msgValue && (
            <button
              className="me-4 text-blue-500 font-semibold"
              onClick={onSubmit}
            >
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
