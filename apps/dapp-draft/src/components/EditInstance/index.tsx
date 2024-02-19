import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import DndItems from '../DndItems'
import './index.css'

function EditInstance(): JSX.Element {
  const abi = useAppSelector((state) => state.instance.abi)
  const dispatch = useAppDispatch()
  return (
    <div className="col-9 d-inline-block">
      <DndItems
        items={abi}
        setItems={(abi) => {
          dispatch({type: 'instance/save', payload: {abi}})
        }}
      />
    </div>
  )
}

export default EditInstance
