import type { MutableRefObject } from 'react'
type TargetValue<T> = T | undefined | null
type TargetType = HTMLElement | Element | Window | Document

export type BasicTarget<T extends TargetType = Element> = | (() => TargetValue<T>) | TargetValue<T> |
    MutableRefObject<TargetValue<T>>;
export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
    // TODO: isBrower
    if (!target) {
        return defaultElement
    }
    let targetElement: TargetValue<T>;
    // TODO: isFunction
    if ('current' in target) {
        targetElement = target.current
    } else {
        targetElement = target
    }
    return targetElement
}
