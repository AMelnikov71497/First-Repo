import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

//Типизируем объект в items
type CartSliceType = {
  id: string,
  imageUrl: string,
  name: string,
  type: string,
  price: number,
  count: number
}

//Типизируем initialState
type IcartSliceType = {
  totalPrice: number,
  items: CartSliceType[]
}

const initialState: IcartSliceType = {
    items: [],
    totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'addCart',
  initialState,

  reducers: {
    addProduct(state, action: PayloadAction<CartSliceType>) {
      const findIndex = state.items.find(obj => obj.id === action.payload.id)
      if(findIndex) {
        findIndex.count++
      }else {state.items.push({...action.payload, count: 1})}
      
      state.totalPrice = state.items.reduce((sum, obj)=> ((obj.price * obj.count) + sum), 0)
    },
    minusProduct(state, action: PayloadAction<string>) {
      const findIndexMinus = state.items.find(obj => obj.id === action.payload)
      if(findIndexMinus && findIndexMinus.count > 1) {
       findIndexMinus.count--
       
       state.totalPrice = state.items.reduce((sum, obj)=> ((obj.price * obj.count) + sum), 0)
      }
    },
    plusProduct(state, action: PayloadAction<string>) {
      const findIndexMinus = state.items.find(obj => obj.id === action.payload)
      if(findIndexMinus && findIndexMinus.count > 1) {
       findIndexMinus.count++
       
       state.totalPrice = state.items.reduce((sum, obj)=> ((obj.price * obj.count) + sum), 0)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalPrice = state.items.reduce((sum, obj)=> ((obj.price * obj.count) + sum), 0)
      
    },
    clearBasket(state) {
      state.items = []
      state.totalPrice = state.items.reduce((sum, obj)=> ((obj.price * obj.count) + sum), 0)
      
    }

  },
})


//Создаём селекторы(именуем стрелочную функцию для дальнейщего её использования в useSelector())
export const selectCard = (state: RootState) => state.cartSlice
export const addedCountSelect = (id: string) => (state: RootState) => state.cartSlice.items.find(obj => obj.id === id)

//Делвем экспорт методов работы с хранилищем(actions)
export const { addProduct, minusProduct, plusProduct, clearBasket, removeItem } = cartSlice.actions
//Делаем экспорт сомого slice 
export default cartSlice.reducer
