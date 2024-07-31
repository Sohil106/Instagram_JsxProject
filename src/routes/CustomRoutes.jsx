import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";
import { AllRoutes } from "../constants/Routes";
import Reset from "../pages/Reset/Reset";
import Home from "../pages/home/Home";
import ResetLink from "../pages/Reset/ResetLink";
import { Profile } from "../pages/profile/Profile";
import Search from "../pages/search/Search";
import Exolore from "../pages/exolore/Exolore";
import Reels from "../pages/reels/Reels";
import Messages from "../pages/messages/Messages";
import Notifications from "../pages/notifications/Notifications";
import EditProfile from "../pages/profile/EditProfile";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={AllRoutes.Login} element={<Login />}></Route>
      <Route path={AllRoutes.Reset} element={<Reset />}></Route>
      <Route path={AllRoutes.ResetLink} element={<ResetLink />}></Route>
      <Route path={AllRoutes.SignUp} element={<SignUp />}></Route>
      <Route path="/*" element={<Navigate to={AllRoutes.Login} />} ></Route>
    </Routes>
  );
};

export const NormalRoutes = () => {
  return (
    <Routes>
      <Route path={AllRoutes.Home} element={<Home />}></Route>
      {/* <Route path={AllRoutes.Search} element={<Search />}></Route> */}
      <Route path={AllRoutes.Explore} element={<Exolore />}></Route>
      <Route path={AllRoutes.Reels} element={<Reels />}></Route>
      <Route path={AllRoutes.Messages} element={<Messages />}></Route>
      {/* <Route path={AllRoutes.Notifications} element={<Notifications />}></Route> */}
      {/* <Route path={AllRoutes.Create} element={<Create />}></Route> */}
      <Route path={AllRoutes.Profile} element={<Profile />}></Route>
      <Route path={AllRoutes.OtherProfile} element={<Profile />}></Route>
      <Route path={AllRoutes.EditProfile} element={<EditProfile />}></Route>
      <Route path="/profile/:tab" element={<Profile />} />


      <Route path="/*" element={<Navigate to={AllRoutes.Home} />} />
    </Routes>
  );
};
