import { AuthRoutes, NormalRoutes } from "./routes/CustomRoutes";
import { resetError, useSelectorUserState } from "./redux/slices/AuthSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isTokenValid } from "./utils/AuthService";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const istokenValid = isTokenValid();
  const { isLoggedIn } = useSelectorUserState();
  useEffect(() => {
    dispatch(resetError());
  }, [location.pathname]);
  return <> {isLoggedIn ? <NormalRoutes /> : <AuthRoutes />}</>;
};

export default App;
