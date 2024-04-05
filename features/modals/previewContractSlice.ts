import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false
};

const previewContractSlice = createSlice({
  name: 'previewContract',
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    }
  }
});

export const { openModal, closeModal } = previewContractSlice.actions;
export default previewContractSlice.reducer;
