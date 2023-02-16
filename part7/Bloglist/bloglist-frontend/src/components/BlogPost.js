import { useSelector, useDispatch } from 'react-redux'
import { modifyBlog, removeBlog, refreshBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/messageReducer'
import { useField } from '../hooks'

const BlogPost = ({ blog }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const comment = useField('text')

  const updateBlog = async (blog) => {

    try {
      dispatch(modifyBlog(blog))
      dispatch(setNotification({
        type: 'green',
        message: `blog ${blog.title} has been updated`
      }, 5))
    } catch (exception) {
      console.log(exception)
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

  const addLike = (event) => {
    event.preventDefault()
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }
  const addComment = (event) => {
    event.preventDefault()
    if (!comment.value) {
      dispatch(setNotification({
        type: 'red',
        message: 'Comment can\'t be empty'
      }, 5))
    } else {
      updateBlog({ ...blog, comments: blog.comments.concat(comment.value) })
    }

  }

  const deleteBlog = (event) => {
    event.preventDefault()
    wipeBlog(blog)

  }

  if (!blog) {
    return null
  }

  return (
    <div className='ml-3 mt-3'>
      <h1 to={`/blogs/${blog.id}`} className="text-xl font-medium text-slate-900">{blog.title}</h1>
      <p className='URL my-2'>URL :{blog.url}</p>
      <div className='likes' >
        <p className="text-sm font-medium text-slate-900">Likes :{blog.likes}</p>
        <button onClick={addLike} id="like" className="submitBtn w-10 font-medium ">Like</button>
      </div>
      <p className="text-sm text-slate-500 truncate my-2">{blog.author}</p>
      <button className={` ${user.userid === blog.user.id ? 'inline-block submitBtn w-14 font-medium' : 'hidden'}`} id="delete" onClick={deleteBlog}>Delete</button>
      <div className=''>
        <h2 className='text-lg font-medium text-slate-900 my-4'>Comments</h2>
        <form className='flex flex-row gap-4 items-center' onSubmit={addComment}>
          <input className='textField w-80 ' {...comment} />
          <button className='submitBtn'>
                        Add Comment
          </button>
        </form>
        <ul className='list-disc mt-4'>
          {blog.comments.map((comment, i) => <li className='my-2' key={i}>{comment}</li>)}
        </ul>
      </div>
    </div>
  )

}

export default BlogPost