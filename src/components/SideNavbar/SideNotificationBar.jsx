import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { MdKeyboardArrowRight } from "react-icons/md";
import profiledemo from "../../assets/images/profiledemo.jpg";
import NotifyList from "../notification/NotifyList";
import { useDispatch } from "react-redux";
import { getRequestList } from "../../redux/slices/ProfileSlice";

const SideNotificationBar = ({ openSidebar2 }) => {
  const [userList, setUserList] = useState([]);
  const [totalRecord, settotalRecord] = useState(0);
  const dispatch = useDispatch();

  const fethRequestList = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const res = await dispatch(getRequestList({ PageNumber: 1, PageSize: 5 }));
    if (res.payload.isSuccess) {
      settotalRecord(res.payload.data.totalRecord);
      setUserList(res.payload.data.data[0]);
    }
  };

  useEffect(() => {
    fethRequestList();
  }, []);

  return (
    <Sidebar
      width="500px"
      className="bg-zinc-100 h-screen"
      style={{ marginLeft: "100px", position: "fixed", zIndex: "99" }}
    >
      <div className="font-semibold text-2xl px-2 py-3">Notifications</div>
      {totalRecord > 0 && (
        <div
          className="flex justify-between px-2 py-4"
          onClick={() => {
            openSidebar2();
          }}
        >
          <div className="flex gap-2">
            <div className="flex items-center min-w-fit">
              <img
                src={profiledemo}
                alt="profile"
                className="rounded-full w-8"
              />
            </div>
            <div>
              <p className="font-semibold">Follow requests</p>
              <p className="text-gray-400">
                {totalRecord === 1 ? (
                  <span>{userList.userName}</span>
                ) : (
                  <span>
                    {userList.userName} + {totalRecord - 1} other
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <MdKeyboardArrowRight className="text-2xl" />
          </div>
        </div>
      )}

      <div className="border-b-2 w-full"></div>
      <div className="px-2 py-4">
        {/* <div className="font-semibold  ">Today</div> */}
        <NotifyList />
      </div>
      <div className="border-b-2 w-full"></div>
      {/* <div className="px-2 py-4">
        <div className="font-semibold  ">This Week</div>
        <div className="flex justify-between mt-2">
          <div className="flex gap-2">
            <div className="flex items-center min-w-fit">
              <img
                src={profiledemo}
                alt="profile"
                className="rounded-full w-8"
              />
            </div>
            <div>
              <p>
                <span className="font-semibold">__deep_modhavadiya_18 </span>
                <span className="">
                  started following you
                </span>
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
      </div>
      <div className="border-b-2 w-full"></div> */}
    </Sidebar>
  );
};

export default SideNotificationBar;
