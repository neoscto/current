import {
  getDataFromSessionStorage,
  saveDataToSessionStorage
} from '@/utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('common/fetchPosts', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return response.data;
});

export const userData = getDataFromSessionStorage('UserOffer') || {
  numberOfPeople: null,
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  // numberofpeopleAdditionValue: "",
  cups: '',
  referralCode: '',
  dialCode: '',
  _id: '',
  offerId: '',
  isValidCode: false,
  plan: 'neos'
};

const initialState = { post: [], userData, formBack: '', language: 'es' };

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      saveDataToSessionStorage('UserOffer', state.userData);
    },
    setFormBack: (state, action) => {
      state.formBack = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  }
});

export const { setUserData, setFormBack, setLanguage } = commonSlice.actions;
export default commonSlice.reducer;
