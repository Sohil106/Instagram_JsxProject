import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import DeletePopup from "./DeletePopup";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const EditDeletePost = ({ closePopUp, popUpOpen, postId, deletehandler }) => {
  const [openDeletePopUp, setOpenDeletePopup] = useState(false);
  const handleDeletePopup = () => {
    setOpenDeletePopup(true);
  };
  const closeDeletePopup = () => {
    setOpenDeletePopup(false);
    closePopUp();
  };
  return (
    <Modal
      open={popUpOpen}
      onClose={closePopUp}
      aria-labelledby="parent1-modal-title"
      aria-describedby="parent1-modal-description"
    >
      <Box sx={style} className="flex flex-col justify-center rounded-lg">
        <Button
          className="text-red-500 normal-case font-semibold"
          onClick={handleDeletePopup}
        >
          Delete
        </Button>
        <Divider />
        <Button className="text-gray-500 normal-case font-semibold">
          Edit
        </Button>
        <Divider />

        <Button
          className="text-gray-500 normal-case font-semibold"
          onClick={closePopUp}
        >
          Cancel
        </Button>
        {openDeletePopUp && (
          <DeletePopup
            postId={postId}
            openDeletePopUp={openDeletePopUp}
            closeDeletePopup={closeDeletePopup}
            deletehandler={deletehandler}
          />
        )}
      </Box>
    </Modal>
  );
};

export default EditDeletePost;
