import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/messageReducer'
import { useField } from '../hooks'

const LoginForm = () => {
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = {
        username: username.value,
        password: password.value
      }
      dispatch(login(user))
    } catch (exception) {
      dispatch(setNotification({
        type: 'red',
        message: 'Wrong credentials'
      }, 5))
    }
  }

  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')

  return (
    <form onSubmit={handleLogin} className="relative pb-16">
      <div className="block pb-2">
        <span className="title">Username</span>
        <input
          id="username"
          name="Username"
          className="textField"
          {...username}
        />
      </div>
      <div className="block py-2" >
        <span className="title">Password</span>
        <input
          id="password"
          name="Password"
          className="textField"
          {...password}
        />
      </div >
      <div className="py-4 absolute right-0 " >
        <button id="login-button" type="submit" className="submitBtn">Login</button>
      </div>
    </form >
  )
}

export default LoginForm