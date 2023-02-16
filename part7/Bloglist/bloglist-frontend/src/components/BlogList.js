import { useSelector } from 'react-redux'


import Blog from '../components/Blog'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)

  return (
    <ul role="list" className="divide-y divide-slate-200">
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </ul>
  )
}

export default BlogList