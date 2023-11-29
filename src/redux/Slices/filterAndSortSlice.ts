import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type sortByType = {
  name: string,
  sortProperty: string
}

type IfilterAndSortSliceType = {
  category: null | number,
  sortBy: sortByType
}

let initialState: IfilterAndSortSliceType = {
    category: null,
    sortBy: {
      name: "популярности",
      sortProperty: "rating"
    }
}

export const filterAndSortSlice = createSlice({
    name: 'filterAndSort',
    initialState,
    reducers: {
      setCategoryBy: (state, action: PayloadAction<number | null>) => {
        state.category = action.payload
      },
      setSortBy: (state, action: PayloadAction<sortByType>) => {
        state.sortBy = action.payload
        
      },
    },
  })

  export const filterAndSortSliceSelect = (state: RootState) => state.filterAndSortSlice 
   
  export const { setCategoryBy, setSortBy } = filterAndSortSlice.actions
  
  export default filterAndSortSlice.reducer
