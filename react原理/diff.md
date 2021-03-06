# 时间复杂度
将一棵树转换成另一棵树的最小操作次数。
[树是一种递归的数据结构，需要递归创建，复杂度O(n)。
字符串的最小编辑距离需要O(n^2)。](https://juejin.cn/post/6892671384976097287)
树的最小编辑距离需要O(n^3)。
## 启发式算法
两个假设：
- 两个不同类型的元素会产生出不同的树；
- 开发者可以使用 key 属性标识哪些子元素在不同的渲染中可能是不变的。Key 应该具有稳定，可预测，以及列表内唯一的特质。
时间复杂度为 O(n) （因为虚拟DOM变成链表了？）
# diffing算法
- 对比不同类型的元素。当根节点为不同类型的元素时，react会拆卸原来的树（含对应的DOM 节点和状态）并建立起新的树。
- 对比同一类型的元素。保留DOM节点，仅比对及更新有改变的属性。
- 对比同类型的组件元素。当一个组件更新时，组件实例会保持不变，因此可以在不同的渲染时保持 state 一致。React 将更新该组件实例的 props 以保证与最新的元素保持一致，并且调用该实例的 UNSAFE_componentWillReceiveProps()、UNSAFE_componentWillUpdate() 以及 componentDidUpdate() 方法。下一步，调用 render() 方法，diff 算法将在之前的结果以及新的结果中进行递归。默认情况下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。