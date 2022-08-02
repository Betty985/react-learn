state是驱动应用程序的数据；
Action 是任意可以改变 State的代码；
任何来源是State并且不需要进一步交互的东西都是 Derivation；
Mobx 区分了两种 Derivation :

- Computed values,总是可以通过纯函数从当前的可观测 State 中派生。
- Reactions, 当 State 改变时需要自动运行的副作用 (命令式编程和响应式编程之间的桥梁)
- 黄金法则是，如果要基于当前 State 创建值，请始终使用 computed。
- Reaction 和 computed 类似，但并不产生信息，而是产生副作用，如打印到控制台、发出网络请求、增量更新 React 组件树以便更新DOM等。
# 问题
- [TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined
    at new NodeError (node:internal/errors:372:5)](https://stackoverflow.com/questions/60234640/typeerror-err-invalid-arg-type-the-path-argument-must-be-of-type-string-re):将`react-scripts`从3.3.x升级到3.4.x