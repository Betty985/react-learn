import {useCallback,useEffect,useRef} from 'react'
import useLatest from '../useLatest';
import { isNumber } from '../utils'
function useTimeout(fn:()=>void,delay:number|undefined){
    const fnRef=useLatest(fn)
    const timerRef=useRef<number|NodeJS.Timer>()
    useEffect(()=>{
        if(!isNumber(delay)||delay<0) return;
        timerRef.current=setTimeout(()=>{
            fnRef.current()
        },delay)
        return ()=>{
            if(timerRef.current){
                clearTimeout(timerRef.current as NodeJS.Timer)
            }
        }
    },[delay]);
    const clear=useCallback(()=>{
        if(timerRef.current){
            clearTimeout(timerRef.current as NodeJS.Timer)
        }
    },[])
    return clear
}
export default useTimeout
/* 
useCallback:
返回一个 memoized 回调函数。

把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，
该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。
useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
 */