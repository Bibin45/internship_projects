// import React from "react";

// const UserContext=React.createContext()

// export default UserContext

import { configureStore } from '@reduxjs/toolkit'
import User from './redux/slice/User'
import Product from './redux/slice/Product'
export const store = configureStore({
  reducer: {
    user:User,
    product:Product,
  },
})
