import React from "react"
export function Toggle(props){   
    return(
        <button onClick={(e)=>props.onClick(e)}>
            {props.isToggleOn?'ON':'OFF'}
        </button>
    )
}