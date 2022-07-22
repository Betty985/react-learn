const { useState } = require("react")
export function useMouse(){
    let [x, setX] = useState(0)
    let [y, setY] = useState(0)
    return {
        x,
        y,
        handleMouseMove:function handleMouseMove(event) {
            setX(event.clientX)
            setY(event.clientY)
        }
    }
}