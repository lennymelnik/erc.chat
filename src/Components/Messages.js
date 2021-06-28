import React from 'react'

const Messages = ({message,  index, messages}) => {
    return (
        <div>
            <p>{message}: {messages[2][index]}</p>
        </div>
    )
}

export default Messages
