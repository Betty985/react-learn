- 在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。
- 在典型数据流之外强制修改子组件可以用refs。

适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

ref 的值根据节点的类型而有所不同：

- 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
- 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
- 不能在函数组件上使用 ref 属性，因为他们没有实例。如果要在函数组件中使用 ref，可以使用 forwardRef（可与 useImperativeHandle 结合使用），或者可以将该组件转化为 class 组件。可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件