import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BorderAllRounded, Height } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  getFollowerList,
  getFollowingList,
  getMutualList,
  useSelectorProfileState,
} from "../../../redux/slices/ProfileSlice";
import Follower from "./components/Follower";
import { RotatingLines } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
};

const FollowerFollowingModal = ({
  header,
  userId,
  handleOpen,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  // const { followerList, followingList, mutualList } = useSelectorProfileState();

  const fetchList = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let response;
    if (header == "Followers") {
      response = await dispatch(
        getFollowerList({
          SearchValue: searchValue,
          userId: userId,
          PageNumber: page,
          PageSize: 5,
        })
      );
    } else if (header == "Following") {
      response = await dispatch(
        getFollowingList({
          SearchValue: searchValue,
          userId: userId,
          PageNumber: page,
          PageSize: 5,
        })
      );
    } else if (header == "Mutual") {
      response = await dispatch(
        getMutualList({
          SearchValue: searchValue,
          userId: userId,
          PageNumber: page,
          PageSize: 5,
        })
      );
    }

    if (response.payload.isSuccess) {
      const requiredPage = response.payload.data.requiredPage;

      if (requiredPage >= page) {
        const newUsers = response.payload.data.data;
        if (page === 1) {
          setUsers(newUsers);
        } else {
          setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        }
        setPage(page + 1);
      } else {
        setHasMore(false); // No more data to load
      }
      if (requiredPage == pageNumber) {
        setHasMore(false);
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, [header, searchValue]);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(e.target.value);
    setPage(1);
    setUsers([]);
    setHasMore(true);
    // fetchUsers(1, value);
  };

  // const handleSubmit = (e) => {
  //   let value = "";
  //   value = e.target.value;
  //   if (value.length > 0) {
  //     if (header == "Followers") {
  //       dispatch(getFollowerList({ userId: userId, SearchValue: value }));
  //     } else if (header == "Following") {
  //       dispatch(getFollowingList({ userId: userId, SearchValue: value }));
  //     } else if (header == "Mutual") {
  //       dispatch(getMutualList({ userId: userId, SearchValue: value }));
  //     }
  //   } else {
  //     if (header == "Followers") {
  //       dispatch(getFollowerList({ userId: userId }));
  //     } else if (header == "Following") {
  //       dispatch(getFollowingList({ userId: userId }));
  //     } else if (header == "Mutual") {
  //       dispatch(getMutualList({ userId: userId }));
  //     }
  //   }
  // };

  return (
    <div>
      <Modal
        open={handleOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center font-semibold py-2">
            {header == "Following" ? "Following" : "Followers"}
          </div>
          <div className="border-b-2"></div>
          <div>
            <div className="px-3 py-2">
              <input
                type="text"
                className="bg-gray-100 border text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                onKeyUp={handleSearchChange}
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[400px] FollowerFollowingModal">
            <InfiniteScroll
              height={400}
              dataLength={users.length}
              next={fetchList}
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
            >
              {/* {header == "Followers" &&
                users &&
                users.length > 0 &&
                users.map((follower) => (
                  <div key={follower.userId}>
                    <Follower follow={follower} />
                  </div>
                ))}
              {header == "Following" &&
                users &&
                users.length > 0 &&
                users.map((following) => (
                  <div key={following.userId}>
                    <Follower follow={following} />
                  </div>
                ))}
              {header == "Mutual" &&
                users &&
                users.length > 0 &&
                users.map((mutual) => (
                  <div key={mutual.userId}>
                    <Follower follow={mutual} />
                  </div>
                ))} */}
              {users &&
                users.length > 0 &&
                users.map((followerFollowingMutual) => (
                  <div key={followerFollowingMutual.userId}>
                    <Follower follow={followerFollowingMutual} />
                  </div>
                ))}
            </InfiniteScroll>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FollowerFollowingModal;
