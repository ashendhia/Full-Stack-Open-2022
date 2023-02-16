import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    logIn(state, action) {
      return action.payload
    },
    logOut() {
      return null
    }
  }
})

export const { logIn, logOut } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(logIn(user))
      blogService.setToken(user.token)
    }
  }
}

export const login = user => {
  return async dispatch => {
    const loggedUser = await loginService.login(user)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(loggedUser)
    )
    blogService.setToken(user.token)
    dispatch(logIn(loggedUser))
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logOut())
  }
}

export default userSlice.reducer