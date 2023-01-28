import { useState, useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className={`notification ${message.type === 'green' ? 'correct' : 'error'}`} >{message.message}</div>
}

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [Message, setMessage] = useState(null)
  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage({
        type: 'green',
        message: `a new blog " ${returnedBlog.title} " added`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({
        type: 'red',
        message: 'You didn\'t include all the informations'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const updateBlog = async (blog) => {

    try {
      const returnedBlog = await blogService.update(blog.id, blog)
      const newBlogs = blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog)
      newBlogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
      setBlogs(newBlogs)
      setMessage({
        type: 'green',
        message: `blog ${blog.title} has been updated`
      })
      setTimeout(() => {
        setMessage(null)
        console.log(user)
      }, 5000)
    } catch (exception) {
      setMessage({
        type: 'red',
        message: `blog ${blog.title} has already been deleted from server`
      })
      setBlogs(blogs.filter(n => n.id !== blog.id))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog " ${blog.title} " by ${blog.author}`)) {
      try {
        blogService.remove(blog.id)
      } catch (exception) {
        setMessage({
          type: 'red',
          message: `blog ${blog.title} has already been deleted from server`
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
      if (blog.user === user.userid) {
        setBlogs(blogs.filter(n => n.id !== blog.id))
        setMessage({
          type: 'red',
          message: `Deleted ${blog.title}`
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else {
        setMessage({
          type: 'red',
          message: `You can't delete ${blog.title}`
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }


    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({
        type: 'red',
        message: 'Wrong credentials'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const LoginForm = () => (
    <form onSubmit={handleLogin} className="relative pb-16">

      <div className="block pb-2">
        <span className="title">Username</span>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          className="textField"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="block py-2" >
        <span className="title">Password</span>
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          className="textField"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div >
      <div className="py-4 absolute right-0 " >
        <button id="login-button" type="submit" className="submitBtn">Login</button>
      </div>
    </form >
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
      console.log(blogs)
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  return (
    <div className="selection:bg-fuchsia-300 selection:text-fuchsia-900 p-4 max-w-full bg-white rounded-xl shadow-lg ">
      <Notification message={Message} />
      <div className=" p-4 max-w-sm sm:py-4 text-xl font-semibold text-black">Blogs</div>
      {user === null ?
        LoginForm() :
        <>
          <div className="flex relative">
            <p className="ml-3 py-2 text-sm font-medium text-slate-700">{user.username} logged-in</p>
            <div className="absolute right-0 " >
              <button className="submitBtn" onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser')
                setUser(null)
              }}>Log Out</button>
            </div>

          </div>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <ul role="list" className="divide-y divide-slate-200">
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={deleteBlog} user={user} />
            )}
          </ul>
        </>

      }
    </div>
  )
}

export default App
