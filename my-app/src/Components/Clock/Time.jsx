import React from "react"
export class Time extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        day: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      }
    }
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(), 1000
      )
    }
    componentWillUnmount() {
      clearInterval(this.timerID)
    }
    tick() {
      this.setState(() => (
        {
          day: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString()
        }))
    }
    render() {
      return (
        <div>
          <h1>hello wolrd </h1>
          <h3>It is {this.state.day}   {this.state.time}.</h3>
        </div>)
    }
}