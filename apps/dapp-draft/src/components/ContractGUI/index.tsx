import React, {useEffect, useState} from 'react'

export function ContractGUI(props: any) {
  const [title, setTitle] = useState<string>('')
  const [toggleContainer, setToggleContainer] = useState<boolean>(false)
  const [buttonOptions, setButtonOptions] = useState<{
    title: string
    content: string
    classList: string
    dataId: string
  }>({title: '', content: '', classList: '', dataId: ''})

  useEffect(() => {
    if (props.title) {
      setTitle(props.title)
    } else if (props.funcABI.name) {
      setTitle(props.funcABI.name)
    } else {
      setTitle(props.funcABI.type === 'receive' ? '(receive)' : '(fallback)')
    }
  }, [props.title, props.funcABI])

  useEffect(() => {
    if (props.lookupOnly) {
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
  }, [props.lookupOnly, props.funcABI, title])

  const switchMethodViewOn = () => {
    setToggleContainer(true)
  }

  const switchMethodViewOff = () => {
    setToggleContainer(false)
  }

  return (
    <div className={`udapp_contractProperty ${(props.funcABI.inputs && props.funcABI.inputs.length > 0) || props.funcABI.type === 'fallback' || props.funcABI.type === 'receive' ? 'udapp_hasArgs' : ''}`}>
      <div className="udapp_contractActionsContainerSingle pt-2" style={{display: toggleContainer ? 'none' : 'flex'}}>
        <div className="d-flex btn p-0 wrapperElement" data-id={buttonOptions.dataId} data-title={buttonOptions.title}>
          <button className={`udapp_instanceButton text-nowrap overflow-hidden text-truncate ${props.widthClass} btn btn-sm ${buttonOptions.classList}`} data-id={buttonOptions.dataId} data-title={buttonOptions.title} disabled={props.disabled || props.inputs !== ''} style={{pointerEvents: 'none'}}>
            {title}
          </button>
        </div>
        <input
          className="form-control"
          data-id={props.funcABI.type === 'fallback' || props.funcABI.type === 'receive' ? `'(${props.funcABI.type}')` : 'multiParamManagerBasicInputField'}
          placeholder={props.inputs}
          data-title={props.funcABI.type === 'fallback' || props.funcABI.type === 'receive' ? `'(${props.funcABI.type}')` : props.inputs}
          style={{
            height: '2rem',
            visibility: !((props.funcABI.inputs && props.funcABI.inputs.length > 0) || props.funcABI.type === 'fallback' || props.funcABI.type === 'receive') ? 'hidden' : 'visible',
          }}
        />
        <i
          className="fas fa-angle-down udapp_methCaret"
          onClick={switchMethodViewOn}
          style={{
            visibility: !(props.funcABI.inputs && props.funcABI.inputs.length > 0) ? 'hidden' : 'visible',
          }}
        ></i>
      </div>
      <div className="udapp_contractActionsContainerMulti" style={{display: toggleContainer ? 'flex' : 'none'}}>
        <div className="udapp_contractActionsContainerMultiInner text-dark">
          <div onClick={switchMethodViewOff} className="udapp_multiHeader">
            <div className="udapp_multiTitle run-instance-multi-title pt-3">{title}</div>
            <i className="fas fa-angle-up udapp_methCaret"></i>
          </div>
          <div>
            {props.funcABI.inputs.map((inp, index) => {
              return (
                <div className="udapp_multiArg" key={index}>
                  <label htmlFor={inp.name}> {inp.name}: </label>
                  <input className="form-control" placeholder={inp.type} data-id={`multiParamManagerInput${inp.name}`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
