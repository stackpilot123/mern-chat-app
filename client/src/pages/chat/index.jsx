import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setNotif } from '../../features/auth/notifySlice';
import ContactsContainer from './components/ContactsContainer';
import EmptyContainer from './components/EmptyContainer';
import ChatContainer from './components/chat-container/ChatContainer';


const Chat = () => {

  const userInfo = useSelector((state)=> state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo.profileSetup){
      dispatch(setNotif({message: "You need to setup the profile first", type:"error"}));
      navigate("/profile");
    }
  }, [userInfo, navigate])
  
  return (
    <div className='flex'>

      <ContactsContainer/>
      {/* <EmptyContainer/> */}
      <ChatContainer/>
    </div>
  )
}

export default Chat
