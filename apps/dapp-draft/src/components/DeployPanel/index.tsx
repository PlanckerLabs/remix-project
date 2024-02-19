import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useAppDispatch} from '../../redux/hooks'

function DeployPanel(): JSX.Element {
  const [formVal, setFormVal] = useState({email: '', password: '', subdomain: ''})
  const dispatch = useAppDispatch()
  return (
    <div className="col-3 d-inline-block">
      <Button
        onClick={() => {
          dispatch({type: 'instance/reset'})
        }}
      >
        Reset
      </Button>
      <Button
        onClick={() => {
          dispatch({type: 'instance/empty'})
        }}
      >
        Delete
      </Button>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch({type: 'instance/deploy', payload: formVal})
        }}
      >
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="surge email"
            required
            value={formVal.email}
            onChange={(e) => {
              setFormVal({...formVal, email: e.target.value})
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="surge password"
            required
            value={formVal.password}
            onChange={(e) => {
              setFormVal({...formVal, password: e.target.value})
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSubdomain">
          <Form.Label>Subdomain</Form.Label>
          <Form.Control
            type="subdomain"
            placeholder="surge subdomain"
            required
            value={formVal.subdomain}
            onChange={(e) => {
              setFormVal({...formVal, subdomain: e.target.value})
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default DeployPanel
