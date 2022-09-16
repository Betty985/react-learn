import { DependencyList, useEffect } from "react"
import useLatest from "../useLatest"

/* 
is:
要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词。 
谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。
 */
export const isNumber=(value:unknown):value is number=>typeof value==='number'
export const isFunction=(value:unknown):value is Function=>typeof value==='function'
export const isBrowser=!!(typeof window!==undefined&&window?.document?.createElement)
export function depsAreSame(oldDeps:DependencyList,deps:DependencyList):boolean{
    if(oldDeps===deps) return true
    for(let i=0;i<oldDeps.length;i++){
        if(!Object.is(oldDeps[i],deps[i])) return false
    }
    return true
}
export const useUnmount=(fn:()=>void)=>{
 if(!isFunction(fn)){
    console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
 }
 const fnRef=useLatest(fn)
 useEffect(()=>()=>{
    fnRef.current()
 },[])
}

