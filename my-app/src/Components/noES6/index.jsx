
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
        return (
            <div>
                <h1>Hello,{this.props.name}.我没有使用ES6</h1>
                <button onClick={this.handleClick}>
                    Say hello
                </button>
            </div>
        )
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
        return (
            <div>
                <Greeting />
                <p>
                    React has been running for {this.state.seconds} seconds.
                </p>
            </div>
        )
    }
})
export { TickTock }