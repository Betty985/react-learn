import React from 'react'
import { Time } from './Time'
import { Toggle } from './Toggle'
export class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggleOn: true
        }
        this.handleClick=this.handleClick.bind(this)
    }
    handleClick(e) {
        // console.log(e)
      this.setState(preState => (
            {
                isToggleOn: !preState.isToggleOn
            }
        ))
    }
    render() {
        if(this.state.isToggleOn)
        return (
            <div>
                <Time />
                <Toggle isToggleOn={!this.state.isToggleOn} onClick={this.handleClick} />
            </div>
        )
        return <Toggle isToggleOn={!this.state.isToggleOn} onClick={this.handleClick} />
    }
}