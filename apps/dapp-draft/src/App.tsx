import React, {useEffect} from 'react'
import CreateInstance from './components/CreateInstance'
import EditInstance from './components/EditInstance'
import DeployPanel from './components/DeployPanel'
import LoadingScreen from './components/LoadingScreen'
import {useAppDispatch, useAppSelector} from './redux/hooks'
import './App.css'

function App(): JSX.Element {
  const dispatch = useAppDispatch()
  const abi = useAppSelector((state) => state.instance.abi)

  useEffect(() => {
    dispatch({type: 'remixide/connect'})
  }, [])
  return (
    <div>
      {abi.length > 0 ? (
        <div className="row m-0">
          <EditInstance />
          <DeployPanel />
        </div>
      ) : (
        <CreateInstance />
      )}
      <LoadingScreen />
    </div>
  )
}

export default App
