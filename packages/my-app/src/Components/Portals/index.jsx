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
   let [count,setCount]=useState(0)
   let handleShow=()=>{
    setState(true)
}
   let handleHide=()=>{setState(false)}
   let handleClick=()=>{
    if(state){
        handleHide()      
    }else{
        handleShow()
        setCount(++count)
    }
   }
   const modal=state?(
    <Modal container={props.container}>
        <div className="modal">
            <div>
                对话框
            </div>
            <button>关闭</button>
        </div>
    </Modal>
   ):null
   return (
    <div onClick={handleClick}>
        <p>对话框打开了{count}次！</p>
        {/*   这个按钮的点击事件会冒泡到父元素
  因为这里没有定义 'onClick' 属性 */}
        <button >打开</button>
        {modal}
    </div>
   )
}
export {Modal,ModalControl}