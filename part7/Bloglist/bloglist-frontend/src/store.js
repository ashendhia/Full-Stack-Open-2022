import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
    message: messageReducer
  }
})

export default store