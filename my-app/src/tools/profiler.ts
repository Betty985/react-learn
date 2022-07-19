export function onRenderCallback(
    id:string, // 发生提交的 Profiler 树的 “id”
    phase:string, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration:number, // 本次更新 committed 花费的渲染时间
    baseDuration:number, // 估计不使用 memoization 的情况下渲染整棵子树需要的时间
    startTime:number, // 本次更新中 React 开始渲染的时间
    commitTime:number, // 本次更新中 React committed 的时间
    interactions // 属于本次更新的 interactions 的集合
  ) {
    // 合计或记录渲染时间。。。
    let result:Array<string>=['id','类型','本次更新 committed 花费的渲染时间','估计不使用 memoization 的情况下渲染整棵子树需要的时间','本次更新中 React 开始渲染的时间','本次更新中 React committed 的时间','属于本次更新的 interactions 的集合']
    for(let i=0;i<arguments.length;i++){
        console.log(result[i]+':'+arguments[i])
    }
  }