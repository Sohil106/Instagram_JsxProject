import React, { useEffect, useState } from "react";
import profiledemo from "../../assets/images/profiledemo.jpg";
import { getNotificationList } from "../../redux/slices/ProfileSlice";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { RotatingLines } from "react-loader-spinner";
import { Avatar } from "@mui/material";

const NotifyList = () => {
  const dispatch = useDispatch();
  const [notifyList, setNotifyList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotifyList = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await dispatch(
      getNotificationList({ PageNumber: pageNumber, PageSize: 10 })
    );
    if (res.payload.isSuccess) {
      const requiredPage = res.payload.data.requiredPage;

      if (requiredPage >= pageNumber) {
        const newUserData = res.payload.data.data;
        setNotifyList((prevUserData) => [...prevUserData, ...newUserData]);
        setPageNumber(pageNumber + 1);
      } else {
        setHasMore(false); // No more data to load
      }
    }
  };

  useEffect(() => {
    fetchNotifyList();
  }, []);
  return (
    <InfiniteScroll
      dataLength={notifyList.length}
      next={fetchNotifyList}
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
      height={697}
      scrollableTarget="infinite-scroll-container" // Adjust the height to fit your layout
    >
      {notifyList &&
        notifyList.length > 0 &&
        notifyList.map((user) => (
          <div
            className="flex justify-between mt-2 py-4"
            key={user.notificationId}
          >
            <div className="flex gap-2 items-center">
              <Avatar
                src={`data:image/${user.fileType};base64,${user.profilePicture}`}
                alt="profile"
                className="w-8 h-8 "
              />
              <div>
                <p>
                  <span className="font-semibold">{user.username} </span>
                  <span className="">{user.message}</span>
                </p>
                <p className="text-gray-400"></p>
              </div>
            </div>
            <div className="flex items-center">
              <button className="bg-zinc-100 rounded-md font-semibold px-3 py-1 mt-4md:mt-0">
                Following
              </button>
            </div>
          </div>
        ))}
    </InfiniteScroll>
  );
};

export default NotifyList;
