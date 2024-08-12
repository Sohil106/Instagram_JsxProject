import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/slices/ProfileSlice";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const DeletePopup = ({
  openDeletePopUp,
  closeDeletePopup,
  postId,
  deletehandler,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const DeletPost = async () => {
    const res = await dispatch(deletePost(postId));
    if (res.payload.isSuccess) {
      deletehandler(postId);
      closeDeletePopup();
    }
  };

  return (
    <Modal
      open={openDeletePopUp}
      onClose={closeDeletePopup}
      aria-labelledby="child1-modal-title"
      aria-describedby="child1-modal-description"
    >
      <Box sx={style} className="rounded-lg">
        <Box className="text-center py-2">
          <Typography
            id="modal-modal-title"
            className="text-gray-600"
            variant="h6"
            component="h2"
          >
            Delete Post?
          </Typography>
          <Typography className="text-sm text-gray-500">
            Are you sure you want to delete this post?
          </Typography>
        </Box>

        <Box>
          <Divider />
          <Box className="flex flex-col juystify-center">
            <Button
              className="text-red-500 normal-case font-semibold"
              onClick={DeletPost}
            >
              Delete
            </Button>
            <Divider />
            <Button
              className="text-gray-500 normal-case font-semibold"
              onClick={closeDeletePopup}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeletePopup;
