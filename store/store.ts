import { configureStore } from '@reduxjs/toolkit';
import commonReducer from '@/features/common/commonSlice';
import previewContractReducer from '@/features/modals/previewContractSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      commonSlice: commonReducer,
      previewContractSlice: previewContractReducer
    }
  });
}

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
