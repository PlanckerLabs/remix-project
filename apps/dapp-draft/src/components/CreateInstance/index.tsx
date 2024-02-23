import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {useAppDispatch} from '../../redux/hooks'

const CreateInstance: React.FC = () => {
  const [formVal, setFormVal] = useState({address: '', abi: [], name: '', network: ''})
  const dispatch = useAppDispatch()
  return (
    <Form
      className="w-50 m-auto"
      onSubmit={(e: any) => {
        e.preventDefault()
        dispatch({type: 'instance/init', payload: {...formVal}})
      }}
    >
      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>address</Form.Label>
        <Form.Control
          type="address"
          placeholder="Enter address"
          value={formVal.address}
          onChange={(e) => {
            setFormVal({...formVal, address: e.target.value})
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAbi">
        <Form.Label>abi</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          type="abi"
          placeholder="Enter abi"
          value={formVal.abi.length > 0 ? JSON.stringify(formVal.abi) : ''}
          onChange={(e) => {
            let abi = []
            try {
              abi = JSON.parse(e.target.value)
            } catch (error) {}
            setFormVal({...formVal, abi})
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter name"
          value={formVal.name}
          onChange={(e) => {
            setFormVal({...formVal, name: e.target.value})
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formNetwork">
        <Form.Label>network</Form.Label>
        <Form.Control
          type="network"
          placeholder="Enter network"
          value={formVal.network}
          onChange={(e) => {
            setFormVal({...formVal, network: e.target.value})
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!formVal.address || !formVal.name || !formVal.network || !formVal.abi.length}>
        Submit
      </Button>
    </Form>
  )
}

export default CreateInstance
