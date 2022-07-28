不要创建自己的组件基类。 在 React 组件中，代码重用的主要方式是组合而不是继承。
如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。
componentWillUnmount() 中不应调用 setState()，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。
houldComponentUpdate()返回 false 并不会阻止子组件在 state 更改时重新渲染。
setState() 并不总是立即更新组件。它会批量推迟更新。为了消除隐患，请使用 componentDidUpdate 或者 setState 的回调函数（setState(updater, callback)），这两种方式都可以保证在应用更新后触发。
defaultProps 可以为 Class 组件添加默认 props。这一般用于 props 未赋值，但又不能为 null 的情况。