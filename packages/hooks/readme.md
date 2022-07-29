# useEvent
- 函数引用每次都会变化，这会直接破坏 Child 组件 memo 效果，
甚至会引发其更严重的连锁反应（Child 组件将 onClick 回调用在 useEffect 里时）。
- 保证函数引用不变，我们就需要用 useCallback 包裹;但仅能保证在依赖项不变时，函数引用不变。如果想保持函数引用稳定，就要把依赖移除，但是会导致访问到的值总是初始值，引发了更大的问题。
- useRef。每个值都要加一个配套 Ref，非常冗余。在函数内直接同步更新 ref 不是一个好主意，但写在 useEffect 里又太麻烦。
- 自创hook——>useEvent。在赋值 ref 时，useLayoutEffect 时机依然不够提前，如果值变化后理解访问函数，拿到的会是旧值。
生成的函数被用在渲染并不会给出错误提示。
- useEvent的值仅是调用时的快照。
# 补充
- useCallback
> 返回一个 memoized 回调函数。
> 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。
> useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
# 参考资料
- [精读《React useEvent RFC》](https://mp.weixin.qq.com/s/8MNUgKBRFPNNb8_nD1BKgg)