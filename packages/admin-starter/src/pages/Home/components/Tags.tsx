import React, { FC } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner"
interface B {
    tags: any
}
const Tags: FC<B> = (props) => {
    const { tags } = props
    if (tags) {
        return (
            <div className="tag-list">
                {tags.map(tag => {
                    return (
                        <Link
                            to={{
                                pathname: "/",
                                search: "?tab=tag&tag=" + tag
                            }}
                            className="tag-default tag-pill"
                            key={tag}
                        >
                            {tag}
                        </Link>
                    );
                })}
            </div>
        );
    } else {
        return <LoadingSpinner />;
    }
}
export default Tags