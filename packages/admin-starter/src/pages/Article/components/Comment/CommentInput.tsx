import React, { FC, useState } from "react";
import useStores from "../../../../hooks/useStores";
interface A{
    currentUser:any;
    slug:any
}
const CommentInput: FC<A>= (props) => {
    const { commentStore } = useStores()
    const [body, setBody] = useState('')
    const {isCreatingComment}=commentStore
    const createComment = e => {
        e.preventDefault()
        commentStore.createComment({ body: body }).
            then(() => setBody(''))
    }
    return (
        <form className="card comment-form" onSubmit={createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="写评论..."
            value={body}
            disabled={isCreatingComment}
            onChange={e=>setBody(e.target.value)}
            rows={3}
          />
        </div>
        <div className="card-footer">
          <img
            src={props.currentUser.image}
            className="comment-author-img"
            alt="comment-author-img"
          />
          <button
            className="btn btn-sm btn-primary"
            type="submit"
          >
           发评论
          </button>
        </div>
      </form>       
    )

}
export default CommentInput