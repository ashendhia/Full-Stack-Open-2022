import PropTypes from 'prop-types'

import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const addLike = (event) => {
    event.preventDefault()
    updateBlog({ ...blog, likes: blog.likes + 1 })

  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blog)

  }
  return (
    <li className="blog">
      <div>
        <button onClick={toggleVisibility} id="viewOrHide" className="submitBtn w-10 absolute right-0 font-medium ">{visible ? 'hide' : 'view'}</button>
        <div className="ml-3">
          <p className="text-sm font-medium text-slate-900">{blog.title}</p>
          <p className={` ${visible ? 'URL' : 'hiddenURL'} `}>URL :{blog.url}</p>
          <div className={` ${visible ? 'likes' : 'hiddenLikes'} `} >
            <p className="text-sm font-medium absolute left-0 top-2 text-slate-900">Likes :{blog.likes}</p>
            <button onClick={addLike} id="like" className="submitBtn absolute w-10 top-1 right-0 font-medium">Like</button>
          </div>
          <p className="text-sm text-slate-500 truncate">{blog.author}</p>
          <button className={` ${visible && user.userid === blog.user ? 'inline-block submitBtn w-14 font-medium' : 'hidden'}`} id="delete" onClick={deleteBlog}>Delete</button>
        </div>
      </div>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired

}

export default Blog