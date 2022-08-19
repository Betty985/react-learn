import ListErrors from "../../components/ListErrors";
import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";
import useStores from "../../hooks/useStores";
import { useNavigate } from "react-router-dom";
const LoginForm: FC = observer(() => {
    const { authStore } = useStores()
    const navigate = useNavigate()
    const { values, errors, inProgress } = authStore;
    const handleEmailChange = e => {
        authStore.setEmail(e.target.value);
    };

    const handlePasswordChange = e => {
        authStore.setPassword(e.target.value);
    };

    const handleSubmitForm = e => {
        e.preventDefault();
        authStore.login().then(() => navigate("/", { replace: true }));
    };
    useEffect(() => {
        return authStore.reset()
    })
    return (
        <>
            <ListErrors errors={errors} />

            <form onSubmit={handleSubmitForm}>
                <fieldset>
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
    );
})
export default LoginForm;

