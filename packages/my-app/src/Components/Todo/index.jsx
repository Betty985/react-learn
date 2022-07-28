import React from "react"
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '',
            clear: false
        }
        this.input = this.input.bind(this)
    }
    input(e) {
        this.setState({ msg: e.target.value, clear: false })
    }
    render() {
        return (
            <div>
                <label>
                    请输入：
                    <input value={this.state.clear ? '' : undefined} onInput={this.input} />
                </label>
                <input
                    type='button'
                    value='添加'
                    onClick={
                        () => {
                            this.setState({ clear: true })
                            this.props.onClick(this.state.msg)
                        }
                    } />
            </div>
        )
    }
}
class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '',
            modified: true,
            count: 0
        }
        this.input = this.input.bind(this)
        this.modify = this.modify.bind(this)
    }
    input(e) {
        this.setState({ msg: e.target.value })
    }
    modify() {
        let modified = !this.state.modified
        const count = this.state.count
        this.setState({
            modified,
            count: count + 1
        })
        if (count % 2 === 0) {
            this.props.update(this.state.msg, this.props.id)
        }
    }
    render() {
        return (
            <li className={this.props.isfinished ? 'finished' : 'unfinished'} >
                <button onClick={this.props.finish}>{this.props.isfinished ? '√' : '×'}</button>
                <input
                    disabled={this.state.modified}
                    defaultValue={this.props.msg}
                    name={this.props.msg}
                    onChange={this.input}
                />
                <button onClick={this.modify}>
                    {this.state.count % 2 === 0 ? '修改' : '确定'}
                </button>
                <button onClick={this.props.delete}>删除</button>
            </li>
        )
    }
}

export class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [{
                status: 0,
                msg: '看书'
            }]
        }
        this.add = this.add.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }
    update(msg, i) {
        let history = this.state.items.slice()
        history[i].msg = msg
        this.setState(() => ({ items: history }))
    }
    finish(i) {
        let history = this.state.items.slice()
        history[i].status = !history[i].status
        this.setState(() => ({ items: history }))
    }
    delete(i) {
        let history = this.state.items.slice()
        history.splice(i, 1)
        this.setState(() => ({ items: history }))
    }
    add(msg) {
        let history = this.state.items.slice()
        history.push({
            status: 0,
            msg
        })
        this.setState(() => ({ items: history }))
    }
    render() {
        const items = this.state.items
        const list = items.map((item, i) => {
            return (
                <Item
                    key={i}
                    id={i}
                    msg={item.msg}
                    finish={() => this.finish(i)}
                    update={this.update}
                    delete={() => this.delete(i)}
                    isfinished={item.status}

                />
            )
        })

        return (
            <div>
                <Header onClick={this.add} />
                <>{list}</>
            </div>
        )
    }
}