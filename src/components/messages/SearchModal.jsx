import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Menu } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { createChat, getUserList } from "../../redux/slices/ProfileSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { RotatingLines } from "react-loader-spinner";
import { MenuItem } from "react-pro-sidebar";
import FollowRequestButton from "../../pages/profile/FollowRequestButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const SearchModal = ({
  openSearchModal,
  handleCloseSearch,
  handleFromUserData,
}) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  //   const [newFromUserData, setNewFromUserData] = useState([]);

  const fetchUsers = async (pageNumber, searchValue) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await dispatch(
        getUserList({
          SearchValue: searchValue,
          PageNumber: pageNumber,
          PageSize: 5,
        })
      );
      if (response.payload.isSuccess) {
        const requiredPage = response.payload.data.requiredPage;

        if (requiredPage >= pageNumber) {
          const newUsers = response.payload.data.data;
          if (pageNumber === 1) {
            setUsers(newUsers);
          } else {
            setUsers((prevUsers) => [...prevUsers, ...newUsers]);
          }
          setPage(pageNumber + 1);
        } else {
          setHasMore(false); // No more data to load
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(page, searchValue);
  }, [searchValue]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(e.target.value);
    setPage(1);
    setUsers([]);
    setHasMore(true);
    // fetchUsers(1, value);
  };
  const handleUser = async (userId) => {
    const res = await dispatch(createChat({ toUserId: userId }));
    if (res.payload.isSuccess) {
      //   setNewFromUserData(res.payload.data);
      handleFromUserData(res.payload.data);
    }
    // openChatMessages(userId);
  };

  return (
    <Modal
      open={openSearchModal}
      onClose={handleCloseSearch}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="rounded">
        <div className="header flex justify-between items-center py-2 border-b-2">
          <div></div>
          <div className="font-bold text-gray-700">New message</div>
          <IconButton onClick={handleCloseSearch}>
            <IoMdClose />
          </IconButton>
        </div>
        <div className="border-b-2 py-1 px-2 ">
          <span className="font-semibold text-gray-700"> To:</span>
          <input
            type="text"
            className="focus:outline-none ps-4"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <div
          className="min-h-[400px] max-h-[400px] overflow-auto"
          id="aboveParent"
        >
          <InfiniteScroll
            dataLength={users.length}
            next={() => fetchUsers(page, searchValue)}
            hasMore={hasMore}
            loader={
              <div className="h-[150px] w-full flex justify-center">
                <RotatingLines
                  visible={true}
                  className
                  height="40px"
                  width="40px"
                  strokeColor="#3b82f6"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            }
            endMessage={
              <p className="py-2 text-center">
                <b>You have seen it all</b>
              </p>
            }
            scrollableTarget="aboveParent"
          >
            <div>
              {users.map((user) => (
                <div
                  className="mt-2 px-2 hover:bg-gray-300"
                  key={user.userId}
                  onClick={() => handleUser(user.userId)}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <div className="flex items-center min-w-fit">
                        <img
                          src={`data:image/${user.fileType};base64,${user.profilePictureUrl}`}
                          alt="profile"
                          className="rounded-full w-8"
                        />
                      </div>
                      <div>
                        <p>{user.userName}</p>
                        <p>{user.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
        <div className="p-3">
          <Button className="normal-case bg-blue-500 text-white font-semibold py-2 px-2 text-xs hover:bg-blue-500 w-full">
            Chat
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default SearchModal;
