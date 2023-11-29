import { configureStore } from '@reduxjs/toolkit';
import filterAndSortSlice from './Slices/filterAndSortSlice';
import loadingShawermaSlice from './Slices/shawermaSlice';
import searchSlice from './Slices/serchSlice';
import cartSlice from './Slices/cartSlice';
export const store = configureStore({
  reducer: {
    filterAndSortSlice,
    loadingShawermaSlice,
    searchSlice,
    cartSlice
  },
})

export type RootState = ReturnType<typeof store.getState>



