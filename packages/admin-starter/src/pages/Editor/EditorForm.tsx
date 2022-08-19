import useStores from "../../hooks/useStores";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListErrors from "../../components/ListErrors";
const EditorForm: FC = () => {
    const params = useParams();
    const navigate = useNavigate()
    const [tagInput, setTagInput] = useState('')
    const { editorStore } = useStores()
    const {
        inProgress,
        errors,
        title,
        description,
        body,
        tagList
    } = editorStore;
    const changeTitle = e => editorStore.setTitle(e.target.value);
    const changeDescription = e => editorStore.setDescription(e.target.value);
    const changeBody = e => editorStore.setBody(e.target.value);
    const changeTagInput = e => setTagInput(e.target.value);
    const handleTagInputKeyDown = e => {
        switch (e.keyCode) {
            case 13: // Enter
            case 9: // Tab
            case 188: // ,
                if (e.keyCode !== 9) e.preventDefault();
                handleAddTag();
                break;
            default:
                break;
        }
    };

    const handleAddTag = () => {
        if (tagInput) {
            editorStore.addTag(tagInput.trim());
            setTagInput('')
        }
    };

    const handleRemoveTag = tag => {
        if (editorStore.inProgress) return;
        editorStore.removeTag(tag);
    };

    const submitForm = ev => {
        ev.preventDefault();
        editorStore.submit().then(article => {
            editorStore.reset();
            navigate(`/article/${article.slug}`, { replace: true });
        });
    };
    useEffect(() => {
        editorStore.setArticleSlug(params.slug);
        editorStore.loadInitialData();
    }, [params.slug])
    return (
        <>
            <ListErrors errors={errors} />
            <form>
                <fieldset>
                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="文章标题"
                            value={title}
                            onChange={changeTitle}
                            disabled={inProgress}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="这篇文章关于什么？"
                            value={description}
                            onChange={changeDescription}
                            disabled={inProgress}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <textarea
                            className="form-control"
                            rows={8}
                            placeholder="用markdown写文章"
                            value={body}
                            onChange={changeBody}
                            disabled={inProgress}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter tags"
                            value={tagInput}
                            onChange={changeTagInput}
                            onBlur={handleAddTag}
                            onKeyDown={handleTagInputKeyDown}
                            disabled={inProgress}
                        />

                        <div className="tag-list">
                            {tagList.map(tag => {
                                return (
                                    <span className="tag-default tag-pill" key={tag}>
                                        <i
                                            className="ion-close-round"
                                            onClick={() => handleRemoveTag(tag)}
                                        />
                                        {tag}
                                    </span>
                                );
                            })}
                        </div>
                    </fieldset>

                    <button
                        className="btn btn-lg pull-xs-right btn-primary"
                        type="button"
                        disabled={inProgress}
                        onClick={submitForm}
                    >
                        发文章
                    </button>
                </fieldset>
            </form>
        </>
    )
}
export default EditorForm