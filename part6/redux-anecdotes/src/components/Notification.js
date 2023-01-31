import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: `${notification === null ? 'none' : 'inline-block'}`
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification