import React, {useState} from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {useAppDispatch, useAppSelector} from '../../redux/hooks'

function DeployPanel(): JSX.Element {
  const [formVal, setFormVal] = useState({email: '', password: '', subdomain: ''})
  const [deployState, setDeployState] = useState({code: '', error: ''})
  const loading = useAppSelector((state) => state.loading['instance/deploy'])
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
        className="ml-3"
        onClick={() => {
          dispatch({type: 'instance/empty'})
        }}
      >
        Delete
      </Button>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch({
            type: 'instance/deploy',
            payload: formVal,
            callback: (state) => {
              setDeployState(state)
            },
          })
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
        <Button variant="primary" type="submit" disabled={!formVal.email || !formVal.password || !formVal.subdomain}>
          {loading && <i className="fas fa-spinner fa-spin mr-1"></i>}Submit
        </Button>
        {deployState.code === 'SUCCESS' && (
          <Alert variant="success" className="mt-4">
            Deployed successfully! <br /> Click the link below to view your dapp
            <br />
            <a target="_blank" href={`https://${formVal.subdomain}.surge.sh`}>{`https://${formVal.subdomain}.surge.sh`}</a>
          </Alert>
        )}
        {deployState.error && (
          <Alert variant="danger" className="mt-4">
            {deployState.error}
          </Alert>
        )}
      </Form>
    </div>
  )
}

export default DeployPanel
