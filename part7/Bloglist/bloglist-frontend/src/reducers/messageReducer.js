import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage() {
      return null
    }
  }
})

export const { setMessage, clearMessage } = messageSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
  }
}

export default messageSlice.reducer