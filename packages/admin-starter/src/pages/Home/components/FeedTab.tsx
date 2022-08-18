import React, { FC } from "react";
import { NavLink } from "react-router-dom";
interface A {
    currentUser: any
}
const YourFeedTab: FC<A> = props => {
    const { currentUser } = props
    if (currentUser) {
        return (
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to={{
                        pathname: "/",
                        search: "?tab=feed"
                    }}
                >
                    您的反馈
                </NavLink>
            </li>
        );
    }
    return null;
};

const GlobalFeedTab: FC = () => {
    return (
        <li className="nav-item">
            <NavLink
                className="nav-link"
                to={{
                    pathname: "/",
                    search: "?tab=all"
                }}
            >
                全局提要
            </NavLink>
        </li>
    );
};
interface B {
    tag: any
}
const TagFilterTab: FC<B> = props => {
    const { tag } = props
    return tag && (
        <li className="nav-item">
            <a href="" className="nav-link active">
                <i className="ion-pound" /> {tag}
            </a>
        </li>
    );
};
export {YourFeedTab,GlobalFeedTab,TagFilterTab}