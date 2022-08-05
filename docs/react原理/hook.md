# hook
Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
# 动机
- 在组件之间复用状态逻辑很难。你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。 
- 复杂组件变得难以理解。Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。
- 类组件中的this增加学习成本，类组件在基于现有工具的优化上存在些许问题。
- 由于业务变动，函数组件不得不改为类组件等等。
# 注意
- 只在最顶层使用 Hook
- 只在 React 函数（函数组件，自定义hook）中调用 Hook
# 参考资料
- [官网-hook](https://zh-hans.reactjs.org/docs/hooks-intro.html)
- [30分钟精通React今年最劲爆的新特性——React Hooks](https://www.jqhtml.com/18670.html)