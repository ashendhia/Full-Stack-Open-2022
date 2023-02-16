import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const changedBlog = action.payload
      const newBlogs = state.map(blog =>
        blog.id !== changedBlog.id ? blog : changedBlog
      )
      return newBlogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
    },
    deleteBlog(state, action) {
      const blogToDelete = action.payload
      const newBlogs = state.splice(state.findIndex(blog => blog === blogToDelete), 1)
      return newBlogs
    },
    newBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
    },
    filterBlogs(state, action) {
      const blog = action.payload
      return state.filter(n => n.id !== blog.id)
    }
  }
})

export const { newBlog, deleteBlog, voteFor, setBlogs, filterBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const refreshBlogs = (blog) => {
  return dispatch => dispatch(filterBlogs(blog))
}

export const createBlog = content => {
  return async dispatch => {
    const blog = await blogService.create(content)
    dispatch(newBlog(blog))
  }
}

export const modifyBlog = changedBlog => {
  return async dispatch => {
    const newBlog = await blogService.update(changedBlog.id, changedBlog)
    dispatch(voteFor(newBlog))
  }
}

export const removeBlog = blogToDelete => {
  return async dispatch => {
    await blogService.remove(blogToDelete.id)
    dispatch(deleteBlog(blogToDelete))
  }
}

export default blogSlice.reducer