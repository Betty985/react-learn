import React from 'react'
const e = React.createElement
var createReactClass = require('create-react-class')
var Greeting = createReactClass({
    // 声明默认属性
    getDefaultProps: function () {
        return {
            name: 'Mary',
        }
    },
    // 初始化state
    getInitialState: function () {
        return {
            count: this.props.initialCount,
            message: 'create-react-class模块代替ES6的class'
        }
    },
    // 组件的方法会自动绑定至实例
    handleClick: function () {
        alert(this.state.message)
    },
    render: function () {
        return e("div",
            null,
            e("h1",
                null,
                "Hello,", this.props.name, "! no ES6 or jsx"),
            e("button", {
                onClick: this.handleClick
            }, "Say hello"));
    }
})
var SetIntervalMixin = {
    componentWillMount: function () {
        this.intervals = []
    },
    setInterval: function () {
        this.intervals.push(setInterval.apply(null, arguments))
    },
    componentWillUnmount: function () {
        this.intervals.forEach(clearInterval)
    }
}
var TickTock = createReactClass({
    mixins: [SetIntervalMixin],
    getInitialState: function () {
        return { seconds: 0 }
    },
    componentDidMount: function () {
        // mixin上的方法
        this.setInterval(this.tick, 1000)
    },
    tick: function () {
        this.setState({ seconds: this.state.seconds + 1 })
    },
    render: function () {
        return e("div", null,
            e(Greeting, null),
            e("p", null, "React has been running for ", this.state.seconds, " seconds."));
    }
})
export { TickTock }