import React from "react"
const { useState } = require("react")
export function useMouse(){
    let [x, setX] = useState(0)
    let [y, setY] = useState(0)
    const MouseContext = React.createContext({ x: 0, y: 0 })
    return {
       mouse:{x,y},
       MouseContext,
       handleMouseMove:function handleMouseMove(event) {
            setX(event.clientX)
            setY(event.clientY)
        }
    }
}