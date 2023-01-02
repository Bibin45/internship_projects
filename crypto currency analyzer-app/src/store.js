import { configureStore } from '@reduxjs/toolkit'
import Bitcoin from './redux/slice/Bitcoin'
import Api from './redux/slice/Api'
export const store = configureStore({
  reducer: {
    bitcoin:Bitcoin,
    api:Api
  },
})