import React, { useState } from "react";
import Home from "../home/Home";
import HomeLayout from "../../layouts/HomeLayout";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import ChatDetail from "../../components/messages/ChatDetail";
import StartChat from "../../components/messages/StartChat";
import ChatMessages from "../../components/messages/ChatMessages";
import SearchModal from "../../components/messages/SearchModal";
// const Item = styled(Paper)(({ theme }) => ({
//   // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   // color: theme.palette.text.secondary,
// }));

const Messages = () => {
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [chat, setChat] = useState({ isChatOpen: false, userId: 0, chatId: 0 });
  const [newChat, setNewChat] = useState([]);
  const handleSearchModal = () => {
    setOpenSearchModal(true);
  };

  const handleCloseSearch = () => {
    setOpenSearchModal(false);
  };

  const openChatMessages = (userId, chatId) => {
    setChat({ isChatOpen: true, userId, chatId });
    setOpenSearchModal(false);
  };

  const handleFromUserData = (newUserChat) => {
    setNewChat(newUserChat);
  };
  return (
    <HomeLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={6} md={4} className="border-r-2">
            <div className="left-message-div min-h-screen">
              <ChatDetail
                handleSearchModal={handleSearchModal}
                newChat={newChat}
                openChatMessages={openChatMessages}
              />
            </div>
          </Grid>
          {/* <Divider orientation="horizonatal" /> */}
          <Grid item xs={6} md={8}>
            <div className="right-message-div min-h-screen">
              {chat.isChatOpen ? (
                <ChatMessages userId={chat.userId} chatId={chat.chatId} />
              ) : (
                <StartChat handleSearchModal={handleSearchModal} />
              )}
              {/* <ChatMessages /> */}
            </div>
          </Grid>
        </Grid>
      </Box>

      {openSearchModal && (
        <SearchModal
          openSearchModal={openSearchModal}
          handleCloseSearch={handleCloseSearch}
          handleFromUserData={handleFromUserData}
        />
      )}
    </HomeLayout>
  );
};

export default Messages;
