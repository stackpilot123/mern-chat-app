import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Auth, Profile, Chat } from './pages'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import App from './App'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Navigate to="/auth"/>}/>
      <Route path='auth' element={<Auth/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='chat' element={<Chat/>}/>
      <Route path='*' element={<Navigate to="/auth"/>}/>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
