import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("common/fetchPosts", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

const commonSlice = createSlice({
  name: "common",
  initialState: {
    post: [],
    userData: {
      numberOfPeople: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      numberofpeopleAdditionValue: "",
      cups: "",
    },
    formBack: "",
    language: "es",
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setFormBack: (state, action) => {
      state.formBack = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  },
});

export const { setUserData, setFormBack, setLanguage } = commonSlice.actions;
export default commonSlice.reducer;
