import { useSelector } from "react-redux";
import axiosInstance from "../../helpers/axioseInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") ?? false,
  token: localStorage.getItem("token") ?? "",
  user: {},
  ErrorMessage: "",
  ErrorMailMessage: "",
  ErrorMobilelMessage: "",
  SuccessMessage: "",
  isError: false,
  isEmailError: false,
  isMobileError:false,
  isloading: false,
  success: false,
};

export const login = createAsyncThunk("/auth/login", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/Auth/Login", data);
    if (response.data.isSuccess) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(await response.data);
    }
  } catch (error) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    } else {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
});

export const signup = createAsyncThunk(
  "/auth/signup",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/Auth/Register", data);
      if (response.data.isSuccess) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(await response.data);
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  }
);

export const reset = createAsyncThunk(
  "/auth/SendResetPasswordLink",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/Auth/SendResetPasswordLink", data);
      if (response.data.isSuccess) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(await response.data);
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  }
);
export const resetLinkData = createAsyncThunk(
  "/Auth/ResetPassword",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/Auth/ResetPassword", data);
      if (response.data.isSuccess) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(await response.data);
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  }
);

export const unique = createAsyncThunk(
  "/auth/IsUniqueUsername",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/Auth/IsUniqueUsername?username=${data}`
      );
      if (response.data.isSuccess) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(await response.data);
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  }
);

export const uniqueEmail = createAsyncThunk(
  "/auth/IsUniqueEmail",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/Auth/IsUniqueEmail?email=${data}`
      );
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(await response.data);
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  }
);

export const uniqueMobile = createAsyncThunk(
  "/auth/IsUniqueMobile",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/Auth/IsUniqueMobile?mobile=${data}`
      );
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(await response.data);
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      state.isLoggedIn=false;
    },
    resetError(state){
      state.SuccessMessage = '';
      state.isError = false,
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.ErrorMessage = "";
        state.token = action.payload.data.token;
        state.isloading = false;
        state.isLoggedIn=true;
        localStorage.setItem("token", state.token);
        localStorage.setItem("isLoggedIn",true)
      })
      //   .addCase(login.pending, (state, action) => {
      //     state.isloading = true;
      // })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.ErrorMessage = action.payload.message;
        state.success = false;
        state.isError = true;
        state.isloading = false;
        state.user = {};
      })
      //   .addCase(signup.pending, (state, action) => {
      //     state.isloading = true;
      // })
      .addCase(signup.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.ErrorMessage = action.payload.data[0].message;
        state.success = false;
        state.isError = true;
        state.isloading = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.success = true;
        state.isloading = false;
      })
      .addCase(unique.fulfilled, (state, action) => {
        state.success = true;
        state.isError = false;
      })
      .addCase(unique.rejected, (state, action) => {
        state.isError = true;
        state.ErrorMessage = action.payload.message;
      })
      .addCase(uniqueEmail.fulfilled, (state, action) => {
        state.success = true;
        state.isEmailError = false;
      })
      .addCase(uniqueEmail.rejected, (state, action) => {
        state.isEmailError = true;
        state.ErrorMailMessage = action.payload.message;
      })
      .addCase(uniqueMobile.fulfilled, (state, action) => {
        state.success = true;
        state.isMobileError = false;
      })
      .addCase(uniqueMobile.rejected, (state, action) => {
        state.isMobileError = true;
        state.ErrorMobilelMessage = action.payload.message;
      })
      .addCase(reset.rejected, (state, action) => {
        state.isError = true;
        state.success = false;
        state.ErrorMessage = action.payload.message;
      })
      .addCase(reset.fulfilled, (state, action) => {
        state.success = true;
        state.SuccessMessage = action.payload.message;
      })
      .addCase(resetLinkData.rejected, (state, action) => {
        state.isError = true;
        state.success = false;
        state.ErrorMessage = action.payload.message;
      })
      .addCase(resetLinkData.fulfilled, (state, action) => {
        state.success = true;
        state.SuccessMessage = action.payload.message;
      });
  },
});

export const { logout,resetError } = authSlice.actions;
export const useSelectorUserState = () => {
  const userState = useSelector((state) => state.auth);
  return userState;
};

export default authSlice.reducer;
