import {execution} from '@remix-project/remix-lib'
import React, {useEffect, useState} from 'react'

const txHelper = execution.txHelper

const getFuncABIInputs = (funABI: any) => {
  if (!funABI.inputs) {
    return ''
  }
  return txHelper.inputParametersDeclarationToString(funABI.inputs)
}

export function ContractGUI(props: {funcABI: any}) {
  const isConstant = props.funcABI.constant !== undefined ? props.funcABI.constant : false
  const lookupOnly = props.funcABI.stateMutability === 'view' || props.funcABI.stateMutability === 'pure' || isConstant
  const inputs = getFuncABIInputs(props.funcABI)
  const [title, setTitle] = useState<string>('')
  const [buttonOptions, setButtonOptions] = useState<{
    title: string
    content: string
    classList: string
    dataId: string
  }>({title: '', content: '', classList: '', dataId: ''})

  useEffect(() => {
    if (props.funcABI.name) {
      setTitle(props.funcABI.name)
    } else {
      setTitle(props.funcABI.type === 'receive' ? '(receive)' : '(fallback)')
    }
  }, [props.funcABI])

  useEffect(() => {
    if (lookupOnly) {
      setButtonOptions({
        title: title + ' - call',
        content: 'call',
        classList: 'btn-info',
        dataId: title + ' - call',
      })
    } else if (props.funcABI.stateMutability === 'payable' || props.funcABI.payable) {
      setButtonOptions({
        title: title + ' - transact (payable)',
        content: 'transact',
        classList: 'btn-danger',
        dataId: title + ' - transact (payable)',
      })
    } else {
      setButtonOptions({
        title: title + ' - transact (not payable)',
        content: 'transact',
        classList: 'btn-warning',
        dataId: title + ' - transact (not payable)',
      })
    }
  }, [lookupOnly, props.funcABI, title])

  return (
    <div className={`udapp_contractProperty ${(props.funcABI.inputs && props.funcABI.inputs.length > 0) || props.funcABI.type === 'fallback' || props.funcABI.type === 'receive' ? 'udapp_hasArgs' : ''}`}>
      <div className="udapp_contractActionsContainerSingle p-2" style={{display: 'flex'}}>
        <div className="d-flex btn p-0 wrapperElement" data-id={buttonOptions.dataId} data-title={buttonOptions.title}>
          <button disabled className={`udapp_instanceButton text-nowrap overflow-hidden text-truncate btn btn-sm ${buttonOptions.classList}`} data-id={buttonOptions.dataId} data-title={buttonOptions.title} style={{pointerEvents: 'none'}}>
            {title}
          </button>
        </div>
        <input
          disabled
          className="form-control"
          data-id={props.funcABI.type === 'fallback' || props.funcABI.type === 'receive' ? `'(${props.funcABI.type}')` : 'multiParamManagerBasicInputField'}
          placeholder={inputs}
          data-title={props.funcABI.type === 'fallback' || props.funcABI.type === 'receive' ? `'(${props.funcABI.type}')` : inputs}
          style={{
            height: '2rem',
            visibility: !((props.funcABI.inputs && props.funcABI.inputs.length > 0) || props.funcABI.type === 'fallback' || props.funcABI.type === 'receive') ? 'hidden' : 'visible',
          }}
        />
      </div>
    </div>
  )
}
