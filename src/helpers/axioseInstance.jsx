import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";
// import { authSliceReducer } from "../redux/slices/AuthSlice";

// Function to set navigate function
let dispatch;
export function setNavigate(navigateFunc) {
  dispatch = navigateFunc;
}

// Function to log out the user
function logoutUser() {
  dispatch(logout());
}

const axiosInstance = axios.create({
  baseURL: "http://192.168.4.147:8007",
  withCredentials: false,
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["ngrok-skip-browser-warning"] = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.code === "ERR_NETWORK" ||
      (error.response && error.response.status === 401)
    ) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

//fdsdf
