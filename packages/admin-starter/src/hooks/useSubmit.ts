import { useEffect, useState } from "react";
import useStores from "./useStores";
import { useNavigate } from "react-router-dom";
function useSubmit(){
    const navigate = useNavigate();
    const { authStore } = useStores()
    const [err,setErr]=useState([])
    const [inProgress,setProgress]=useState(false)
    const [values,setValues]=useState()
    const handleUsernameChange = e => authStore.setUsername(e.target.value);
    const handleEmailChange = e => authStore.setEmail(e.target.value);
    const handlePasswordChange = e => authStore.setPassword(e.target.value);
    const handleSubmitForm = e => {
        e.preventDefault();
        setProgress(true)
        authStore.register().then(() =>{ 
            navigate("/")
        }).finally(()=>{
            setErr(authStore.errors)
            setProgress(authStore.inProgress)
        });
    
    };
    useEffect(() => {
        setValues(authStore.values)
        return () => { 
            authStore.reset() 
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
