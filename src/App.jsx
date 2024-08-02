import './App.css'
import {Header, Footer} from './components/index'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import authService from './appwrite/auth'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    setLoading(true)
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.log('Error while fetching user data:', error);
    })
    .finally(()=>{
      setLoading(false)
    })
  }, [])

  return loading ? (<div>Loading...</div>) : (
    <div className='min-h-screen flex flex-wrap bg-gray-600'>
      <div className='w-full block'>
        <Header />
          <main>
            <Outlet />
          </main>
        <Footer /> 
      </div>
    </div>
  )
}

export default App
