import React, { FC } from "react";
interface A {
    appName: any;
    token: any
}
const Banner: FC<A> = (props) => {
    const { appName, token } = props
    if (token) {
        return null
    }
    return (
        <div className="banner">
            <div className="container">
                <h1 className="logo-font">
                    {appName.toLowerCase()}
                </h1>
                <p>一个分享你的知识的地方。</p>
            </div>
        </div>
    )
}
export default Banner