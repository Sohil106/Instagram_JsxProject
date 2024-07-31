import { useSelector } from "react-redux";
import axiosInstance from "../../helpers/axioseInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "autoprefixer";

const initialState = {
  ErrorMessage: "",
  SuccessMessage: "",
  isError: false,
  isloading: false,
  success: false,
  user: {},
  profilePicture: "",
  otherProfilePicture: "",
  UserList: {},
  followerList: [],
  followingList: [],
  mutualList: [],
  postList: [],
  mutualcount: 0,
};

export const getProfilePicture = createAsyncThunk(
  "/File/GetProfilepicture",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/File/GetProfilePicture/${data}`,
        {
          responseType: "blob",
        }
      );
      if (response.status >= 200 && response.status <= 299) {
        const blob = response.data;

        // Convert blob to base64
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
          reader.onloadend = () => {
            const base64data = reader.result; // base64 data
            resolve(base64data);
          };
          reader.onerror = () => {
            reject(
              thunkAPI.rejectWithValue({
                message: "Error converting to base64",
              })
            );
          };

          reader.readAsDataURL(blob);
        });
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

export const getIndProfilePicture = createAsyncThunk(
  "/File/GetIndProfilepicture",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/File/GetProfilePicture/${data}`,
        {
          responseType: "blob",
        }
      );
      if (response.status >= 200 && response.status <= 299) {
        const blob = response.data;

        // Convert blob to base64
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
          reader.onloadend = () => {
            const base64data = reader.result; // base64 data
            resolve(base64data);
          };
          reader.onerror = () => {
            reject(
              thunkAPI.rejectWithValue({
                message: "Error converting to base64",
              })
            );
          };

          reader.readAsDataURL(blob);
        });
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

export const postProfilePicture = createAsyncThunk(
  "/User/ProfilePicture",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/User/UploadProfilePicture",
        data
      );
      if (response.data.isSuccess) {
        const imageFile = data.get("profilePicture");
        const blob = imageFile;
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
          reader.onloadend = () => {
            const base64data = reader.result; // base64 data
            resolve(base64data);
          };
          reader.onerror = () => {
            reject(
              thunkAPI.rejectWithValue({
                message: "Error converting to base64",
              })
            );
          };

          reader.readAsDataURL(blob);
        });
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

export const getUserData = createAsyncThunk(
  "/User/get",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/User/GetProfile/${data}`);
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

export const getotherUserData = createAsyncThunk(
  "/User/getotherUser",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/User/GetProfile/${data}`);
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
export const getUserList = createAsyncThunk(
  "/User/UserList",
  async (data, thunkAPI) => {
    try {
      let response;
      if (data.SearchValue) {
        response = await axiosInstance.get(
          `/User/GetUserList?SearchValue=${data.SearchValue}&PageNumber=${data.PageNumber}&PageSize=${data.PageSize}`
        );
      } else {
        response = await axiosInstance.get(
          `/User/GetUserList?PageNumber=${data.PageNumber}&PageSize=${data.PageSize}`
        );
      }
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

export const getFollowerList = createAsyncThunk(
  "/User/followerList",
  async (data, thunkAPI) => {
    try {
      let response;
      if (data.SearchValue) {
        response = await axiosInstance.get(
          `/User/${data.userId}/GetFollowerList?SearchValue=${data.SearchValue}`
        );
      } else {
        response = await axiosInstance.get(
          `/User/${data.userId}/GetFollowerList?PageNumber=${data.PageNumber}&PageSize=${data.PageSize}`
        );
      }
      if (response.data.isSuccess) {
        console.log(response);
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
export const getFollowingList = createAsyncThunk(
  "/User/followingList",
  async (data, thunkAPI) => {
    let response;
    try {
      if (data.SearchValue) {
        response = await axiosInstance.get(
          `/User/${data.userId}/GetFollowingList?SearchValue=${data.SearchValue}`
        );
      } else {
        response = await axiosInstance.get(
          `/User/${data.userId}/GetFollowingList?PageNumber=${data.PageNumber}&PageSize=${data.PageSize}`
        );
      }
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

export const getMutualList = createAsyncThunk(
  "/User/mutualList",
  async (data, thunkAPI) => {
    let response;
    try {
      if (data.SearchValue) {
        response = await axiosInstance.get(
          `/User/${data.userId}/GetMutualList?SearchValue=${data.SearchValue}`
        );
      } else {
        response = await axiosInstance.get(
          `/User/${data.userId}/GetMutualList?PageNumber=${data.PageNumber}&PageSize=${data.PageSize}`
        );
      }
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
export const getRequestList = createAsyncThunk(
  "/User/requestList",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/User/GetUserRequestList?PageNumber=${data.PageNumber}&PageSize=${data.PageSize}`
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

export const getPostList = createAsyncThunk(
  "/User/postList",
  async (data, thunkAPI) => {
    let response;
    try {
      if (data.SearchValue) {
        response = await axiosInstance.get(
          `/Post/GetPostList?userId=${data.userId}&SearchValue=${data.SearchValue}`
        );
      } else {
        response = await axiosInstance.get(
          `/Post/GetPostList?userId=${data.userId}&postListType=${data.postListType}&PageNumber=${data.PageNumber}&PageSize=${data.PageSize}`
        );
      }
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

export const addPosts = createAsyncThunk(
  "/User/addPosts",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/Post/AddOrUpdatePost", data);
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

export const addOrRemoveStory = createAsyncThunk(
  "/Story/AddOrRemoveStory",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/Story/AddOrRemoveStory",
        data
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

export const addOrUpdateComment = createAsyncThunk(
  "/User/addOrUpdateComment",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/Post/AddOrUpdateComment",
        data
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

export const getHomePagePostList = createAsyncThunk(
  "/User/homepagePostList",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/Post/GetHomePagePostList?PageNumber=${data.PageNumber}&PageSize=${data.PageSize}`
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

export const getReelPagePostList = createAsyncThunk(
  "/User/getReelPagePostList",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/Post/GetReelPagePostList`);
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

export const getPost = createAsyncThunk(
  "/User/getPost",
  async (postId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/Post/GetPost?postId=${postId}`
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

export const updateUserData = createAsyncThunk(
  "/User/update",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.put("/User/EditUser", data);
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

export const AddorRemoveRequest = createAsyncThunk(
  "/User/addOrRemove",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/User/AddOrRemoveFollowRequest/${id}`
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

export const acceptOrRemoveRequest = createAsyncThunk(
  "/User/acceptOrRemoveRequest",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/User/AcceptOrRejectRequest/${data.requestId}?isAccepted=${data.isAccepted}`
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

export const removeComment = createAsyncThunk(
  "/User/removeComment",
  async (commentId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `/Post/DeleteComment/${commentId}`
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

export const addOrRemovePostLike = createAsyncThunk(
  "/User/addOrRemovePostLike",
  async (postId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/Post/AddOrRemovePostLike?postId=${postId}`
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

export const seenStory = createAsyncThunk(
  "/Story/SeenStory",
  async (storyId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/Story/${storyId}/SeenStory`);
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

export const followerCount = createAsyncThunk(
  "/User/folowerCount",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/User/${id}/GetFollowersCount}`
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

export const followingCount = createAsyncThunk(
  "/User/folowingCount",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/User/${id}/GetFollowingCount}`
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

export const getStory = createAsyncThunk(
  "/Story/getStory",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/Story/GetStory`);
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

export const getOtherStory = createAsyncThunk(
  "/Story/GetFollowingStory",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/Story/GetFollowingStory?PageNumber=${data.PageNumber}&PageSize=${data.PageSize}`
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

export const getSuggestionList = createAsyncThunk(
  "/User/getSuggestionList",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/User/GetSuggestionList?PageNumber=${data.PageNumber}&PageSize=${data.PageSize}`
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

export const getNotificationList = createAsyncThunk(
  "/getNotificationList",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/Notification/GetNotificationList?PageNumber=${data.PageNumber}&PageSize=${data.PageSize}`
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetUsers(state) {
      state.UserList = [];
      state.followerList = [];
      state.followingList = [];
      mutualList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfilePicture.fulfilled, (state, action) => {
        state.success = true;
        state.profilePicture = action.payload;
      })
      .addCase(getProfilePicture.rejected, (state, action) => {
        state.success = false;
        state.isError = true;
      })
      .addCase(getIndProfilePicture.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(getIndProfilePicture.rejected, (state, action) => {
        state.success = false;
        state.isError = true;
      })
      .addCase(postProfilePicture.fulfilled, (state, action) => {
        state.isError = true;
        state.success = true;
        state.profilePicture = action.payload;
      })
      .addCase(postProfilePicture.rejected, (state, action) => {
        state.success = false;
        state.ErrorMessage = action.payload.message;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.success = true;
        state.user = action.payload.data;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.success = false;
        state.isError = true;
      })
      .addCase(getotherUserData.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(getotherUserData.rejected, (state, action) => {
        state.success = false;
        state.isError = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.success = false;
        state.isError = true;
        state.ErrorMessage = action.payload.message;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.success = true;
        state.UserList = action.payload.data.data;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.success = false;
      });
    builder.addCase(getFollowerList.fulfilled, (state, action) => {
      state.loading = false;
      state.followerList = action.payload.data.data;
    });
    builder.addCase(getFollowerList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getFollowingList.fulfilled, (state, action) => {
      state.loading = false;
      state.followingList = action.payload.data.data;
    });
    builder.addCase(getFollowingList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getMutualList.fulfilled, (state, action) => {
      state.loading = false;
      state.mutualList = action.payload.data.data;
      state.mutualcount = action.payload.data.totalRecord;
    });
    builder.addCase(getMutualList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getPostList.fulfilled, (state, action) => {
      state.loading = false;
      state.postList = action.payload.data.data;
    });
    builder.addCase(getPostList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    // builder.addCase(getPost.fulfilled, (state, action) => {
    //   state.post = action.payload.data.data
    // })
    // builder.addCase(getPost.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.error;
    // });
  },
});

export const { resetUsers } = profileSlice.actions;
export const useSelectorProfileState = () => {
  const userState = useSelector((state) => state.profile);
  return userState;
};

export default profileSlice.reducer;
