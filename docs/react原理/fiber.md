Fiber 是 React 16 中新的协调引擎。“fiber” reconciler 是一个新尝试，致力于解决 stack reconciler 中固有的问题，同时解决一些历史遗留问题。Fiber 从 React 16 开始变成了默认的 reconciler。
它的主要目标是：
- 使 Virtual DOM 可以进行增量式渲染:将渲染工作分割成块并分散到多个帧的能力。。
- 能够把可中断的任务切片处理。
- 能够调整优先级，重置并复用任务。
- 能够在父元素与子元素之间交错处理，以支持 React 中的布局。
- 能够在 render() 中返回多个元素。
- 更好地支持错误边界。
#  参考资料
- [react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)
- [react官网](https://zh-hans.reactjs.org/docs)