// TODO:
import { DependencyList, EffectCallback, useEffect, useLayoutEffect, useRef} from 'react';
import { BasicTarget, getTargetElement } from './domTarget';
import {depsAreSame,useUnmount} from './index'
// import createEffectWithTarget from './createEffectWithTarget';

const createEffectWithTarget=(useEffectType:typeof useEffect|typeof useLayoutEffect)=>{
    const useEffectWithTarget =(effect:EffectCallback,deps:DependencyList,target:BasicTarget<any>|BasicTarget<any>[])=>{
        const hasInitRef=useRef(false)
        const lastElementRef=useRef<(Element|null)[]>([])
        const lastDepsRef=useRef<DependencyList>([])
        const unLoadRef=useRef<any>()
        useEffectType(()=>{
          const targets=Array.isArray(target)?target:[target]
          const els=targets.map((item)=>getTargetElement(item))

          if(!hasInitRef.current){
            hasInitRef.current=true
            lastElementRef.current=els
            lastDepsRef.current=deps
            unLoadRef.current=effect()
            return
          }
          if(els.length!==lastElementRef.current.length||!depsAreSame(els,lastElementRef.current)||!depsAreSame(deps,lastDepsRef.current)){
            // "?.": SyntaxKind.QuestionDotToken。安全链式调用
            unLoadRef.current?.()
            lastElementRef.current=els
            lastDepsRef.current=deps
            unLoadRef.current=effect()
          }
        })
        useUnmount(()=>{
            unLoadRef.current?.()
            hasInitRef.current=false
        })
     }
     return useEffectWithTarget
}

export default createEffectWithTarget