import React, { FC, useEffect, useState } from "react";
import ListErrors from "../../components/ListErrors";
import useStores from "../../hooks/useStores";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
const RegisterForm: FC = observer(() => {
    const navigate = useNavigate();
    const { authStore } = useStores()
    const [err,setErr]=useState([])
    const [inProgress,setProgress]=useState(false)
    const { values} = authStore
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
        return () => { 
            authStore.reset() 
        }
    }, [])
    return (
        <>
            <ListErrors errors={err} />
            <form onSubmit={handleSubmitForm}>
                <fieldset>
                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Your Name"
                            value={values.username}
                            onChange={handleUsernameChange}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleEmailChange}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handlePasswordChange}
                        />
                    </fieldset>

                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        disabled={inProgress}
                    >
                       Sign Up
                    </button>
                </fieldset>
            </form>
        </>
    )
})
export default RegisterForm