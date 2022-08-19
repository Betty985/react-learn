import React, { FC } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";
const Register: FC = () => {
    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">注册</h1>
                        <p className="text-xs-center">
                            <Link to="/login">有账号?</Link>
                        </p>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register