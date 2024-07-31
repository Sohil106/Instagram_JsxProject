import { AuthRoutes, NormalRoutes } from "./routes/CustomRoutes";
import { resetError, useSelectorUserState } from "./redux/slices/AuthSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";



const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn } = useSelectorUserState();
  useEffect(() => {
    dispatch(resetError());
  },[location.pathname])
  return <> {isLoggedIn ? <NormalRoutes /> : <AuthRoutes />}</>;
};

export default App;
