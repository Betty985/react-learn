import React, { FC, useEffect } from "react";
import ListErrors from "../../components/ListErrors";
import useStores from "../../hooks/useStores";
import { observer } from "mobx-react";
import { Link, useNavigate } from "react-router-dom";
const RegisterForm: FC = observer(() => {
    const navigate = useNavigate();
    const { authStore } = useStores()
    const { values, errors, inProgress } = authStore
    const handleUsernameChange = e => authStore.setUsername(e.target.value);
    const handleEmailChange = e => authStore.setEmail(e.target.value);
    const handlePasswordChange = e => authStore.setPassword(e.target.value);
    const handleSubmitForm = e => {
        e.preventDefault();
        authStore.register().then(() => navigate("/"));

    };
    useEffect(() => {
        return () => { authStore.reset() }
    }, [])
    return (
        <>
            <ListErrors errors={errors} />
            <form onSubmit={handleSubmitForm}>
                <fieldset>
                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="用户名"
                            value={values.username}
                            onChange={handleUsernameChange}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="邮箱"
                            value={values.email}
                            onChange={handleEmailChange}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="密码"
                            value={values.password}
                            onChange={handlePasswordChange}
                        />
                    </fieldset>

                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        disabled={inProgress}
                    >
                        登录
                    </button>
                </fieldset>
            </form>
        </>
    )
})
const Register: FC = () => {
    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">注册</h1>
                        <p className="text-xs-center">
                            <Link to="login">有账号?</Link>
                        </p>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register