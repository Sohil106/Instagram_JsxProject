import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { getSuggestionList } from "../../redux/slices/ProfileSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { RotatingLines } from "react-loader-spinner";
import FollowRequestButton from "../../pages/profile/FollowRequestButton";
import { debounce } from "lodash";

const SuggestionlList = () => {
  const dispatch = useDispatch();
  const [suggestionList, setSuggestionList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fethSuggestionList = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await dispatch(
      getSuggestionList({ PageNumber: pageNumber, PageSize: 5 })
    );
    if (res.payload.isSuccess) {
      const requiredPage = res.payload.data.requiredPage;

      if (requiredPage >= pageNumber) {
        const newUserData = res.payload.data.data;
        setSuggestionList((prevUserData) => [...prevUserData, ...newUserData]);
        setPageNumber(pageNumber + 1);
      } else {
        setHasMore(false); // No more data to load
      }
    }
  };

  useEffect(() => {
    fethSuggestionList();
  }, []);

  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, []);
  //   const handleScroll = debounce(() => {}, 300);

  return (
    <div
      className="infinite-scroll-container"
      style={{ height: "400px", overflowY: "auto" }}
    >
      <InfiniteScroll
        dataLength={suggestionList.length}
        next={fethSuggestionList}
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
        height={350}
        scrollableTarget="infinite-scroll-container" // Adjust the height to fit your layout
      >
        <Menu>
          {suggestionList &&
            suggestionList.length > 0 &&
            suggestionList.map((user) => (
              <MenuItem className="px-2 py-3" key={user.userId}>
                <div className="">
                  <div className="flex justify-between mt-2">
                    <div className="flex gap-2">
                      <div className="flex items-center min-w-fit">
                        <img
                          src={`data:image/${user.fileType};base64,${user.profilePictureUrl}`}
                          // src={profiledemo}
                          alt="profile"
                          className="rounded-full w-8 "
                        />
                      </div>
                      <div>
                        <p>{user.userName}</p>
                        <p>{user.name}</p>
                        <p className="text-gray-400"></p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <FollowRequestButton
                        userId={user.userId}
                        isPrivate={user.isPrivate}
                        isRequest={user.isRequest}
                        isFollowing={user.isFollowing}
                        isFollowBack={user.isFollowBack}
                        className="bg-blue-500 text-white rounded-md font-semibold px-4 py-0 mt-4md:mt-0"
                      />
                    </div>
                  </div>
                </div>
              </MenuItem>
            ))}
        </Menu>
      </InfiniteScroll>
    </div>
  );
};

export default SuggestionlList;
