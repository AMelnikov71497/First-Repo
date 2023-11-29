import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type SearchSlice = {
  searchValue: string
}

let initialState: SearchSlice = {
   searchValue: ''
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      searchBy: (state, action: PayloadAction<string>) => {
        state.searchValue = action.payload
      },
    },
  })
  

  export const searchValueSelect = ((state: RootState) => state.searchSlice )
  
 
  export const { searchBy } = searchSlice.actions
  
  export default searchSlice.reducer
