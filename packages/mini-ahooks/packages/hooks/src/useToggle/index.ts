import { useMemo,useState } from "react";
export interface Actions<T>{
    setLeft:()=>void;
    setRight:()=>void
    set:(value:T)=>void
    toggle:()=>void
}
function useToggle<T=boolean>():[boolean,Actions<T>];
// 这里的断言很奇怪
// function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) {
function useToggle<D,R>(defaultValue:D=false  as D,reverseValue?:R ){
   const [state,setState]=useState<D|R>(defaultValue)
   const actions=useMemo(()=>{
    const reverseValueOrigin =(reverseValue??defaultValue) as D|R;
    const setLeft=()=>setState(defaultValue)
    const setRight=()=>setState(reverseValueOrigin)
    const set = (value:D|R)=>setState(value)
    const toggle=()=>setState((s)=>(s===defaultValue?reverseValueOrigin:defaultValue))
    return {
        toggle,
        set,
        setLeft,
        setRight,
    }
},[])
  return [state,actions]
}
export default useToggle
/* 
把“创建”函数和依赖项数组作为参数传入 useMemo，
它仅会在某个依赖项改变时才重新计算 memoized 值。
这种优化有助于避免在每次渲染时都进行高开销的计算。
 */