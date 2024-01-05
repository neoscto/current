import { configureStore} from '@reduxjs/toolkit';
import commonReducer from '@/features/common/commonSlice';

export function makeStore(){
  return configureStore({
    reducer: {
        commonSlice: commonReducer
    }
  })
}

export const store = makeStore()
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

