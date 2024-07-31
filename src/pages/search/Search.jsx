import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import {
  getProfilePicture,
  getUserData,
  getUserList,
  resetUsers,
  useSelectorProfileState,
} from "../../redux/slices/ProfileSlice";
import profiledemo from "../../assets/images/profiledemo.jpg";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import FollowRequestButton from "../profile/FollowRequestButton";
import InfiniteScroll from "react-infinite-scroll-component";
import { data } from "autoprefixer";
import { RotatingLines } from "react-loader-spinner";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const fetchUsers = async (pageNumber, searchValue) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await dispatch(
        getUserList({
          SearchValue: searchValue,
          PageNumber: pageNumber,
          PageSize: 15,
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

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Sidebar
      width="500px"
      className="bg-gray-100 h-screen"
      style={{ marginLeft: "100px", position: "fixed", zIndex: "99" }}
    >
      <div className="absolute top-0 w-full z-[5000] bg-zinc-50">
        <div className="font-semibold text-2xl mb-5 px-2 py-3">Search</div>
        <div className="mx-2 mt-5">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            className="bg-gray-100 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Search"
          />
        </div>
        <div className="border-b-2 my-5"></div>
      </div>

      <div className="pt-40 h-full">
        <InfiniteScroll
          height={785}
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
        >
          <Menu>
            {users.map((user) => (
              <MenuItem className="mt-2" key={user.userId}>
                <div className="flex justify-between">
                  <div
                    className="flex gap-2"
                    onClick={() => handleUserClick(user.userId)}
                  >
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
                  <div>
                    <FollowRequestButton
                      userId={user.userId}
                      isPrivate={user.isPrivate}
                      isRequest={user.isRequest}
                      isFollowing={user.isFollowing}
                      isFollowBack={user.isFollowBack}
                    />
                  </div>
                </div>
              </MenuItem>
            ))}
          </Menu>
        </InfiniteScroll>
      </div>
    </Sidebar>
  );
};

export default Search;
