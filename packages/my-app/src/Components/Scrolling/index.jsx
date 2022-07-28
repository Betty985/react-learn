import React from "react"
export class ScrollingList extends React.Component{
    constructor(props){
        super(props)
        this.listRef=React.createRef()
    }
    getSnapshotBeforeUpdate(prevProps,prevState){
        if(prevProps.list.length<this.props.list.length){
            const list=this.listRef.current
            console.log(prevProps,prevState)
            return list.scrollHeight-list.scrollTop
        }
        return null
    }
    componentDidUpdate(prevProps,prevState,snapshot){
          // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
    // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
    //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
        if(snapshot!==null){
            const list=this.listRef.current
            list.scrollTop=list.scrollHeight-snapshot
        }
    }
    render(){
        return (
            <div ref={this.listRef}>{this.props.children}</div>
        )
    }

}