import { useEffect, useState } from "react";
import useStores from "./useStores";
import { useNavigate } from "react-router-dom";
import {SubmitCaller} from '../typings'
function useSubmit(caller:SubmitCaller){
    const navigate = useNavigate();
    const { authStore } = useStores()
    const [err,setErr]=useState([])
    const [inProgress,setProgress]=useState(false)
    const [values,setValues]=useState(authStore.values)
    const handleUsernameChange = e => authStore.setUsername(e.target.value);
    const handleEmailChange = e => authStore.setEmail(e.target.value);
    const handlePasswordChange = e => authStore.setPassword(e.target.value);
    const handleSubmitForm = e => {
        e.preventDefault();
        setProgress(true)
        if(caller===SubmitCaller.REGISTER){
            authStore.register().then(() =>{ 
                navigate("/")
            }).finally(()=>{
                setErr(authStore.errors)
                setProgress(authStore.inProgress)
            });
        }
        if(caller===SubmitCaller.LOGIN){
            authStore.login().then(() =>{ 
                navigate("/")
            }).finally(()=>{
                setErr(authStore.errors)
                setProgress(authStore.inProgress)
            });
        }
    
    };
    useEffect(() => {
        setValues(authStore.values)
        return () => { 
            authStore.reset() 
            setErr([])
        }
    }, [])
    return {
        err,
        inProgress,
        values,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleSubmitForm
    }
}
export default useSubmit
