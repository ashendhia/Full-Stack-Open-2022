import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className="relative py-2 pb-10">
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="submitBtn absolute right-0">{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility} className="submitBtn absolute right-0">Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable