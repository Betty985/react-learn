// 高阶组件
import {useState,useEffect} from 'react'
function CommentList(props){
    let [comments,setComments]=useState(DataSource.getComments)
    let handleChange=()=>{
        setComments(DataSource.getComments())
    }
    useEffect(()=>{
       // 订阅更改 
        DataSource.addChangeListener(handleChange)        
        // 取消订阅
        return  DataSource.removeChangeListener(handleChange)
    }) 
    return (
        <div>
            {comments.map((comment)=>(
                <Comment comment={comment} key={comment.id}/>
            ))}
        </div>
    )
}
// 订阅单个博客帖子
function BlogPost(props){
    let [blogPost,setBlogPost] = useState(DataSource.getBlogPost(props.id))
    let handleChange=()=>{
        setBlogPost(DataSource.getBlogPost(props.id))
    }
    useEffect(()=>{
        DataSource.addChangeListener(handleChange);
        return DataSource.removeChangeListener(handleChange)
    })
    return <TextBlock text={blogPost}/>
}
const CommentListWithSubscription=withSubscription(CommentList,(DataSource)=>DataSource.getComments())
const BlogPostWithSubscription=withSubscription(BlogPost,(DataSource,props)=>DataSource.getBlogPost(props.id))
function withSubscription(WrappedComponent,selectData){
    return function(props){
        let [data,setData]=useState(selectData(DataSource,props))
        let handleChange=()=>{
            setData(DataSource,props)
        }
        useEffect(()=>{
            DataSource.addChangeListener(handleChange)
            return DataSource.addChangeListener(this.handleChange);
        })
        return <WrappedComponent data={data} {...props}/>
    }
}