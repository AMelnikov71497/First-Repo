import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store';

type sortByType = {
  name: string,
  sortProperty: string
}

type fetchShawermasType = {
  category: null | number, 
  sortBy: sortByType, 
  searchValue: string
}

export const fetchShawermas   = createAsyncThunk(
  'shawermas/fetchShawermasStatus',
  async (params: fetchShawermasType) => {
    let { category, sortBy, searchValue } = params
    const { data } = await axios.get(`https://65151360dc3282a6a3cdd042.mockapi.io/shawermas?${category !== null?`category=${category}`:''}&sortBy=${sortBy.sortProperty}&search=${searchValue}&order=desc`)
    return data
  }
)

type loadingShawermaSliceType = {
  id: string
  imageUrl: string
  name: string
  type: string[]
  price: number,
  rating: number
}

type IloadingShawermaSliceType = {
  status: "loading" | "success" | "error"
  items: loadingShawermaSliceType[]
}

const initialState: IloadingShawermaSliceType = {
    items: [],
    status: "loading"
}

export const loadingShawermaSlice = createSlice({
  name: 'loadingShawermas',
  initialState,
  reducers: {
    loadingShawermas: (state, action) => {
     state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShawermas.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchShawermas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = "success"
    })
    builder.addCase(fetchShawermas.rejected, (state) => {
      state.status = "error"
      state.items = []
    })

  },
  
})

export const loadingShawermaSliceSelect = (state: RootState) => state.loadingShawermaSlice

export const { loadingShawermas } = loadingShawermaSlice.actions
  
export default loadingShawermaSlice.reducer

    
  
