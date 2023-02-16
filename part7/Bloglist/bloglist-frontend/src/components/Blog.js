import PropTypes from 'prop-types'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { modifyBlog, removeBlog, refreshBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/messageReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const updateBlog = async (blog) => {

    try {
      dispatch(modifyBlog(blog))
      dispatch(setNotification({
        type: 'green',
        message: `blog ${blog.title} has been updated`
      }, 5))
    } catch (exception) {
      dispatch(setNotification({
        type: 'red',
        message: `blog ${blog.title} has already been deleted from server`
      }, 5))
      dispatch(refreshBlogs(blog))
    }

  }

  const wipeBlog = async (blog) => {
    if (window.confirm(`Remove blog " ${blog.title} " by ${blog.author}`)) {
      try {
        if (blog.user === user.userid) {
          dispatch(removeBlog(blog))
          dispatch(setNotification({
            type: 'red',
            message: `Deleted ${blog.title}`
          }, 5))
        } else {
          dispatch(setNotification({
            type: 'red',
            message: `You can't delete ${blog.title}`
          }, 5))

        }
      } catch (exception) {
        dispatch(setNotification({
          type: 'red',
          message: `blog ${blog.title} has already been deleted from server`
        }, 5))
      }
    }
  }
  const [visible, setVisible] = useState(false)
  const [remove, setRemove] = useState(false)

  if(!user) {
    return null
  }


  const toggleVisibility = () => {
    setVisible(!visible)
    setRemove(!visible && user.userid === blog.user.id)
  }
  const addLike = (event) => {
    event.preventDefault()
    updateBlog({ ...blog, likes: blog.likes + 1 })

  }

  const deleteBlog = (event) => {
    event.preventDefault()
    wipeBlog(blog)

  }


  return (
    <li className="blog">
      <div>
        <button onClick={toggleVisibility} id="viewOrHide" className="submitBtn w-10 absolute right-0 font-medium ">{visible ? 'hide' : 'view'}</button>
        <div className="ml-3">
          <Link to={`/blogs/${blog.id}`} className="text-sm font-medium text-slate-900">{blog.title}</Link>
          <p className={` ${visible ? 'URL' : 'hiddenURL'} `}>URL :{blog.url}</p>
          <div className={` ${visible ? 'likes' : 'hiddenLikes'} `} >
            <p className="text-sm font-medium text-slate-900">Likes :{blog.likes}</p>
            <button onClick={addLike} id="like" className="submitBtn w-10 font-medium">Like</button>
          </div>
          <p className="text-sm text-slate-500 truncate">{blog.author}</p>
          <button className={` ${remove ? 'inline-block submitBtn w-14 font-medium' : 'hidden'}`} id="delete" onClick={deleteBlog}>Delete</button>
        </div>
      </div>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog