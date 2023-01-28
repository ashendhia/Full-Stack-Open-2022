import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleBlogTitleChange = (event) => {
    setNewBlog({
      title: event.target.value,
      author: newBlog.author,
      url: newBlog.url
    })
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlog({
      title: newBlog.title,
      author: event.target.value,
      url: newBlog.url
    })
  }
  const handleBlogUrlChange = (event) => {
    setNewBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: event.target.value
    })
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })

  }

  return (
    <form onSubmit={addBlog} className="relative pb-16">
      <div className="block pb-2">
        <span className="title">Title</span>
        <input
          value={newBlog.title}
          onChange={handleBlogTitleChange}
          className="textField"
          placeholder='title'
        />
      </div>
      <div className="block py-2">
        <span className="title">Author</span>
        <input
          value={newBlog.author}
          onChange={handleBlogAuthorChange}
          className="textField"
          placeholder='author'
        />
      </div>
      <div className="block py-2">
        <span className="title">URL</span>
        <input
          value={newBlog.url}
          onChange={handleBlogUrlChange}
          className="textField"
          placeholder='url'
        />
      </div>
      <div className="py-4 absolute right-0 " >
        <button type="submit" className="submitBtn">Create</button>
      </div>
    </form>
  )
}

export default BlogForm