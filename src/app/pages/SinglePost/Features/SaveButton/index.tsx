import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { usePostsSlice } from "app/pages/Posts/slice";
import { useDispatch } from "react-redux";
import { blogsService } from "services/blogs.service";

export const SaveButton = ({ status, categories, tags, thumbnailFile, editorState }) => {
    const { actions } = usePostsSlice();

    const history: any = useHistory();
    const { search } = useLocation();

    const dispatch = useDispatch();

    const [ isSubmitting, setIsSubmitting ] = useState(false);
    
    const onSave = async e => {
        // TODO: finish

        e.preventDefault();
        const editor_state = await editorState.save();
        const content_json = JSON.stringify(editor_state);
        const data = {
            status, categories, tags, 
            thumbnail: thumbnailFile,
            content_json,
        }
        setIsSubmitting(true);
        try {
            const post = await blogsService.createBlogPost(data as any);
            dispatch(
                actions.addPost({ post })
            );
            history.push("/posts")
        } catch(err) {
            console.log(err)
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <button 
                disabled={isSubmitting}
                onClick={onSave} 
                type="button" 
                style={{ width: "100%" }} 
                className="btn btn-outline-primary"
            >Save</button>
        </>
    )
}