// import React from "react";

// const UserContext=React.createContext()

// export default UserContext

import { configureStore } from '@reduxjs/toolkit'
import User from './redux/slice/User'
export const store = configureStore({
  reducer: {
    user:User
  },
})