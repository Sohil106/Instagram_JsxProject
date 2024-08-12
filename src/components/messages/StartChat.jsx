import { Button } from "@mui/material";
import React, { useState } from "react";
import { RiMessengerLine } from "react-icons/ri";
import SearchModal from "./SearchModal";

const StartChat = ({ handleSearchModal }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-3">
        <RiMessengerLine className="text-6xl rounded-full border-2 border-black p-2" />
        <div>Your Messages</div>
        <div className="text-xs text-gray-500">
          Send a message to start a chat.
        </div>
        <Button
          className="normal-case bg-blue-500 text-white font-semibold py-1 px-2 text-xs hover:bg-blue-500"
          onClick={handleSearchModal}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default StartChat;
