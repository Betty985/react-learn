import React from "react";
// 以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件
function CustomTextInput() {
    // 创建ref来存储input的DOM 元素
    const inputRef = React.createRef()
    function focus() {
        // 通过‘current’访问DOM节点，使用原生API使text输入框获得焦点。
        inputRef.current.focus()
    }
    // 告诉 React 把 <input> ref 关联到构造器里创建的 `inputRef` 上
    return (
        <div>
            <input type='text' ref={inputRef} />
            <input
                type="button"
                value="Focus the text input"
                onClick={focus}
            />
        </div>
    )
}

class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props)
        this.textInputRef = React.createRef()
    }
    componentDidMount() {
        this.textInputRef.current?.focus()
    }
    render() {
        return (
            <>
                自动聚焦
                <CustomTextInput ref={this.textInputRef} />
            </>
        )

    }
}
// Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
// function PasswordInput(props) {
//     return (
//         <div>
//             <input type='password' ref={props.inputRef} />
//         </div>
//     )
// }
class PasswordInput extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <input type='password' ref={this.props.inputRef} />
            </div>
        )
    }
}
// 回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。
class CustomPasswordInput extends React.Component {
    constructor(props) {
        super(props)
        this.inputRef = null
        this.setRef = el => {
            this.inputRef = el
        }
        this.focus = () => {
            this.inputRef?.focus()
        }
    }
    componentDidMount() {
        this.focus()
    }
    render() {
        return (
            <div>
                <PasswordInput inputRef={this.setRef} />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.focus}
                />
            </div>
        )
    }
}
function Input() {
    return (
        <>
            <AutoFocusTextInput />
            <CustomPasswordInput />
        </>
    )
}
export { AutoFocusTextInput, CustomPasswordInput, Input }