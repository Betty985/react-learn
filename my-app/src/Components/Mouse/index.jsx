import React from "react"
import { useMouse } from './../../hooks/useMouse'
function Cat(props) {
    const mouse = props.mouse
    return (
        <img
            src='https://imgs.qiubiaoqing.com/qiubiaoqing/imgs/621248066b1c2fNn.gif'
            alt='Cat'
            style={{ width: '60px', position: 'absolute', left: mouse.x, top: mouse.y }} ></img>
    )
}

/*
   render props是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
   render prop 是一个用于告知组件需要渲染什么内容的函数 prop
*/
function  Mouse (props){
    let contextType=props.MouseContext
    console.log(contextType)
    return (
        <div>
            {props.children(contextType)}
            {props.render(contextType)}
        </div>
    )
}

export function MouseTracker() {
    let { MouseContext } = useMouse()
    return (
        <>
            <h2>移动鼠标！</h2>
            <Mouse render={mouse => (
                <Cat mouse={mouse} />
            )}
            MouseContext={MouseContext}
            >
                {mouse => (<p>当前的鼠标位置是({mouse?.x},{mouse?.y})</p>)}
            </Mouse>
        </>
    )
}