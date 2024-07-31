// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { followerCount, followingCount } from "../../redux/slices/ProfileSlice";

// const Count = ({ userId }) => {
//   const dispatch = useDispatch();
//   const [followersCount, setFollowersCount] = useState(0);
//   const [followingsCount, setFollowingsCount] = useState(0);

//   useEffect(() => {
//     console.log(userId);
//     const getFollowCount = async () => {
//       try {
//         const res = await dispatch(followerCount(userId));
//         if (res.payload.isSuccess) {
//           console.log(res);
//           setFollowersCount(res.payload.data);
//         }
//       } catch (error) {
//         console.error("Error fetching follower count:", error);
//       }
//     };
//     const getFollowingCount = async () => {
//       const res = await dispatch(followingCount(userId));
//       if (res.payload.isSuccess) {
//         setFollowingsCount(res.payload.data);
//       }
//       getFollowCount();
//       getFollowingCount();
//     };
//   }, [userId, dispatch]);
//   return (
//     <div className="md:flex gap-8  hidden">
//       <div>
//         <span className="font-semibold">2</span> <span>Posts</span>
//       </div>

//       <button className="">
//         <span className="font-semibold">{followersCount} </span>
//         <span>followers</span>
//       </button>
//       <button className="">
//         <span className="font-semibold">{followingsCount} </span>
//         <span>following</span>
//       </button>
//     </div>
//   );
// };

// export default Count;
