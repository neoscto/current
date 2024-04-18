import {
  getDataFromSessionStorage,
  saveDataToSessionStorage
} from '@/utils/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('common/fetchPosts', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return response.data;
});

const initialUserData = {
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
  isValidCode: false,
  plan: 'neos',
  offerType: '',
  totalPanels: '',
  capacityPerPanel: '',
  totalCapacity: '',
  estimateProduction: '',
  totalPayment: '',
  neosTotalEmissionSaved: '',
  paybackWithNeos: '',
  percentSavings: '',
  totalSavingsWithNeos: '',
  yearlyConsumption: '',
  typeConsumption: '',
  iban: '',
  bic: '',
  switching: 'C1'
};

export const userData =
  getDataFromSessionStorage('UserOffer') || initialUserData;

const initialState = {
  post: [],
  userData,
  formBack: '',
  language: 'es'
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      saveDataToSessionStorage('UserOffer', state.userData);
    },
    resetUserData: (state) => {
      state.userData = initialUserData;
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

export const { setUserData, resetUserData, setFormBack, setLanguage } =
  commonSlice.actions;
export default commonSlice.reducer;
