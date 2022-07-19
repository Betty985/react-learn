import ReactDOM from 'react-dom'
import {useEffect, useState} from 'react'
 function Modal (props){
    const el=document.createElement('div')
    const container=props.container
    useEffect(()=>{
        container.appendChild(el)
        return ()=>container.removeChild(el)
    })
    return ReactDOM.createPortal(props.children,el)
}
 function ModalControl(props){
   let [state,setState]=useState(false)
   let handleShow=()=>{
    setState(true)
}
   let handleHide=()=>{setState(false)}
   const modal=state?(
    <Modal container={props.container}>
        <div className="modal">
            <div>
                对话框
            </div>
            <button onClick={handleHide}>关闭</button>
        </div>
    </Modal>
   ):null
   return (
    <div>
        <button onClick={handleShow}>打开</button>
        {modal}
    </div>
   )
}
export {Modal,ModalControl}