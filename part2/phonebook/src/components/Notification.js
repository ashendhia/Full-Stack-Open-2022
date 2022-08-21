import React from "react"

const Notification = ({ notification }) => {
    if (notification.type === null) {
        return null
    }

    else if (notification.type === 'green') {
        return (
            <div className='green'>
                {notification.message}
            </div>
        )
    }
    
    return (
        <div className='red'>
                {notification.message}
            </div>
    )
}

export default Notification