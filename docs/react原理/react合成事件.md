> 对大多数事件来说，React 实际上并不会将它们附加到 DOM 节点上。相反，React 会直接在 document 节点上为每种事件类型附加一个处理器。这被称为事件委托。
> - 在大型应用程序上具有性能优势
> - 使添加类似于 replaying events 这样的新特性变得更加容易。
> 
> 自从其发布以来，React 一直自动进行事件委托。当 document 上触发 DOM 事件时，React 会找出调用的组件，然后 React 事件会在组件中向上 “冒泡”。但实际上，原生事件已经冒泡到了 document 级别，React 在其中安装了事件处理器。
> 在 React 17 中，React 将不再向 document 附加事件处理器。而会将事件处理器附加到渲染 React 树的根 DOM 容器中。在 React 16 或更早版本中，React 会对大多数事件执行` document.addEventListener()`。React 17 将会在底层调用` rootNode.addEventListener()`。
>- 由于此更改，现在可以更加安全地进行新旧版本 React 树的嵌套。
>- 将 React 嵌入使用其他技术构建的应用程序变得更加容易
>-  React 17 的事件冒泡更接近常规 DOM。
大部分事件通过事件委托实现。但是有一些特殊情况，如（input)，通过`listenToNonDelegatedEvent`函数绑定到对应的DOM 元素上。
- `createRootImpl`函数中调用`listenToAllSupportedEvents`完成事件代理；
- `createEventListenerWrapperWithPriority`函数返回`listenerWrapper`函数，把原生事件派发到react体系之内。
- 原生事件触发后，遍历fiber树，提取事件的监听函数，存入listeners数组。创建合成事件，加入派发队列。遍历队列，派发事件。
# 参考资料
- [react-v17-rc](https://zh-hans.reactjs.org/blog/2020/08/10/react-v17-rc.html)
- [react-illustration-series](https://7kms.github.io/react-illustration-series/main/synthetic-event)