import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {execution} from '@remix-project/remix-lib'
import {ContractGUI} from '../../components/ContractGUI'
import {useAppDispatch, useAppSelector} from '../../redux/hooks'

const txHelper = execution.txHelper

const getFuncABIInputs = (funABI: any) => {
  if (!funABI.inputs) {
    return ''
  }
  return txHelper.inputParametersDeclarationToString(funABI.inputs)
}

function HomePage(): JSX.Element {
  const [formVal, setFormVal] = useState({email: '', password: '', subdomain: ''})
  const abi = useAppSelector((state) => state.instance.abi)
  const dispatch = useAppDispatch()
  return (
    <div className="row m-0">
      <div className="col-9 d-inline-block">
        {abi.map((funcABI: any, index: any) => {
          if (funcABI.type !== 'function') return null
          const isConstant = funcABI.constant !== undefined ? funcABI.constant : false
          const lookupOnly = funcABI.stateMutability === 'view' || funcABI.stateMutability === 'pure' || isConstant
          const inputs = getFuncABIInputs(funcABI)

          return (
            <div key={index} className={`instance udapp_instance udapp_run-instance border-dark bg-light col m-2`} data-shared="universalDappUiInstance">
              <div className="udapp_cActionsWrapper" data-id="universalDappUiContractActionWrapper">
                <div className="udapp_contractActionsContainer">
                  <div>
                    <ContractGUI funcABI={funcABI} inputs={inputs} lookupOnly={lookupOnly} key={index} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="col-3 d-inline-block">
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
    </div>
  )
}

export default HomePage
