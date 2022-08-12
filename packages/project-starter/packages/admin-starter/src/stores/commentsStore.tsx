import { makeAutoObservable,action } from "mobx";
import { Auth } from "../apis/agent";
const CommentsStore={
    isCreatingComment :false,
    isLoadingComments : false,
    commentErrors : undefined,
    articleSlug : undefined,
    comments : [],
}
export default CommentsStore