import React, {useEffect} from 'react'
import {createHashRouter, RouterProvider} from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './pages/Home'
import {useAppDispatch} from './redux/hooks'
import './App.css'

export const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
])

function App(): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({type: 'remixide/connect'})
  }, [])
  return (
    <>
      <RouterProvider router={router} />
      <LoadingScreen />
    </>
  )
}

export default App
