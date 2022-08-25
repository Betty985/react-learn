import { useEffect, useState } from "react";
import useStores from "./useStores";
import { useNavigate } from "react-router-dom";
import { SubmitCaller } from '../typings'
function useSubmit(caller: SubmitCaller) {
    const navigate = useNavigate();
    const { authStore, editorStore } = useStores()
    const [err, setErr] = useState([])
    const [inProgress, setProgress] = useState(false)
    const [values, setValues] = useState(authStore.values)
    // editor state
    const [tagInput, setTagInput] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const handleUsernameChange = e => authStore.setUsername(e.target.value);
    const handleEmailChange = e => authStore.setEmail(e.target.value);
    const handlePasswordChange = e => authStore.setPassword(e.target.value);
    // editor event
    const handleTitleChange = e => {
        const val=e.target.value
        editorStore.setTitle(val)
        setTitle(val)
    };
    const handleDescriptionChange = e => {
        const val=e.target.value
        editorStore.setDescription(val)
        setDescription(val)
    };
    const handleBodyChange = e => {
        const val=e.target.value
        editorStore.setBody(val)
        setBody(val)
    };
    const handleTagInputChange = e => {
        setTagInput(e.target.value)
    };
    const handleSubmitForm = e => {
        e.preventDefault();
        setProgress(true)
        if (caller === SubmitCaller.REGISTER) {
            authStore.register().then(() => {
                navigate("/")
            }).finally(() => {
                setErr(authStore.errors)
                setProgress(authStore.inProgress)
            });
        }
        if (caller === SubmitCaller.LOGIN) {
            authStore.login().then(() => {
                navigate("/")
            }).finally(() => {
                setErr(authStore.errors)
                setProgress(authStore.inProgress)
            });
        }
        if (caller === SubmitCaller.EDITOR) {
            editorStore.submit().then(article => {      
                navigate(`/article/${article.slug}`, { replace: true });
            }).finally(() => {
                setErr(editorStore.errors)
                setProgress(editorStore.inProgress)
            });
        }

    };
    useEffect(() => {
        if(caller!==SubmitCaller.EDITOR){
            return () => {
                authStore.reset()
            }
        }else{
            return ()=>{
                editorStore.reset()
            }
        }
    }, [])
    return {
        err,
        inProgress,
        values,
        tagInput,
        title,
        description,
        body,
        setTagInput,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleSubmitForm,
        handleTitleChange,
        handleDescriptionChange,
        handleBodyChange,
        handleTagInputChange
    }
}
export default useSubmit
