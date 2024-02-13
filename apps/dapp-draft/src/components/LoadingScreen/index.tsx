import React from 'react'
import BounceLoader from 'react-spinners/BounceLoader'
import {useAppSelector} from '../../redux/hooks'
import './index.css'

const LoadingScreen: React.FC = () => {
  const loading = useAppSelector((state) => state.loading.screen)

  return loading ? (
    <div className="spinnersOverlay">
      <BounceLoader color="#a7b0ae" size={100} className="spinnersLoading" />
    </div>
  ) : null
}

export default LoadingScreen
