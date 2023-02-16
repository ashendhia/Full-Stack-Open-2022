const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <>
      <h2 className=" p-4 max-w-sm sm:py-4 text-xl font-semibold text-black">{user.name}</h2>
      <h3 className=" p-4 max-w-sm sm:py-4 text-base font-semibold text-black" >Added Blogs</h3>
      <ul className="text-slate-400 dark:text-slate-200 pl-6 list-disc">
        {user.blogs.map((blog, i) =>
          <li key={i}>{blog.title}</li>
        )}
      </ul>
    </>
  )
}

export default User