import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/messageReducer'

import Togglable from './components/Togglable'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import './index.css'
import Users from './components/Users'
import User from './components/User'
import BlogPost from './components/BlogPost'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className={`notification ${message.type === 'green' ? 'correct' : 'error'}`} >{message.message}</div>
}

const LogOut = ({ onClick, user }) => {
  return (
    <div className="flex relative">
      <p className="ml-3 py-2 text-sm font-medium text-slate-700">{user.username} logged-in</p>
      <div className="absolute right-0 " >
        <button className="submitBtn" onClick={onClick}>Log Out</button>
      </div>
    </div>
  )
}

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [dispatch])


  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.message)

  const blogFormRef = useRef()

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  if (!users && !blogs) {
    return null
  }

  const userMatched = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const blogMatched = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      dispatch(setNotification({
        type: 'green',
        message: `a new blog " ${blogObject.title} " added`
      }, 5))
    } catch (exception) {
      dispatch(setNotification({
        type: 'red',
        message: 'You didn\'t include all the informations'
      }, 5))
    }

  }

  return (
    <div className="selection:bg-fuchsia-300 selection:text-fuchsia-900 p-4 max-w-full bg-white rounded-xl shadow-lg ">
      <Notification message={message} />
      <nav className='flex flex-row gap-4'>
        <Link to="/blogs" className=" p-4 max-w-sm sm:py-4 text-xl font-semibold text-black">Blogs</Link>
        <Link to="/users" className=" p-4 max-w-sm sm:py-4 text-xl font-semibold text-black">Users</Link>
      </nav>
      {user === null ?
        <LoginForm /> :
        <>
          <LogOut onClick={() => dispatch(logout())} user={user} />
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User user={userMatched} />} />
            <Route path="/blogs/:id" element={<BlogPost blog={blogMatched} />} />
            <Route path="/blogs" element={
              <>
                <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                  <BlogForm createBlog={addBlog} />
                </Togglable>
                <BlogList />
              </>
            } />
            <Route path="/" element={
              <>
                <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                  <BlogForm createBlog={addBlog} />
                </Togglable>
                <BlogList />
              </>
            } />
          </Routes>
        </>
      }
    </div>
  )
}

export default App
