import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { MdKeyboardArrowLeft } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import profiledemo from "../../assets/images/profiledemo.jpg";
import { decodeToken } from "../../utils/AuthService";
import { useDispatch } from "react-redux";
import { getRequestList } from "../../redux/slices/ProfileSlice";
import UserRequest from "../../pages/notifications/UserRequest";
import "./SideNavbar.css";
import { RotatingLines } from "react-loader-spinner";
import SuggestionlList from "../notification/SuggestionlList";

const SideNotificationBar2 = ({ closeSidebar2 }) => {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fethRequestList = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await dispatch(
      getRequestList({ PageNumber: pageNumber, PageSize: 5 })
    );
    if (res.payload.isSuccess) {
      const requiredPage = res.payload.data.requiredPage;

      if (requiredPage >= pageNumber) {
        const newUserData = res.payload.data.data;
        setUserList((prevUserData) => [...prevUserData, ...newUserData]);
        setPageNumber(pageNumber + 1);
      } else {
        setHasMore(false); // No more data to load
      }
    }
  };

  useEffect(() => {
    fethRequestList();
  }, []);

  const data = decodeToken();

  return (
    <Sidebar
      width="500px"
      className="bg-zinc-100 h-screen"
      style={{ marginLeft: "100px", position: "fixed", zIndex: "99" }}
    >
      <div className="font-semibold text-center py-2">
        <span
          className="cursor-pointer"
          onClick={() => {
            closeSidebar2();
          }}
        >
          <MdKeyboardArrowLeft className="text-2xl absolute" />
        </span>
        Follow Request
      </div>
      <div className="h-96">
        <InfiniteScroll
          dataLength={userList.length}
          next={fethRequestList}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center">
              <RotatingLines
                visible={true}
                height="40"
                width="40"
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
          height={350} // Adjust the height to fit your layout
        >
          <Menu className="NotificationMenu">
            {userList &&
              userList.length > 0 &&
              userList.map((user) => (
                <MenuItem className="px-2 py-3" key={user.userId}>
                  <UserRequest user={user} fethRequestList={fethRequestList} />
                </MenuItem>
              ))}
          </Menu>
        </InfiniteScroll>
      </div>
      <div>
        <p className="text-center font-semibold">Suggestion List</p>
        <SuggestionlList />
      </div>
    </Sidebar>
  );
};

export default SideNotificationBar2;
