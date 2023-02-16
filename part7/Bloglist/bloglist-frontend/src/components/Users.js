import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  if(!users) {
    return null
  }

  return (
    <>
      <h2 className=" p-4 max-w-sm sm:py-4 text-xl font-semibold text-black">Users</h2>
      <table className="shadow-sm overflow-hidden my-8 border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Name</th>
            <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Blogs Created</th>
          </tr>
        </thead>
        <tbody className='bg-white dark:bg-slate-800'>
          {users.map((user, i) =>
            <tr key={i}>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Users