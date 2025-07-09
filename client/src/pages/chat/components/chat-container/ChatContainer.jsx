import React from 'react'
import ChatHeader from './ChatHeader'
import MessageContainer from './MessageContainer'
import MessageBar from './MessageBar'

const ChatContainer = () => {
  return (
    <div className='relative h-screen w-full flex flex-col bg-[#0f1117] text-white'>
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar/>
    </div>
  )
}

export default ChatContainer
