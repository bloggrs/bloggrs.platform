import { LineLoader } from "app/components/LineLoader";
import { GeneralDetails as GeneralDetailsFeature } from "app/pages/CreateBlog/GeneralDetails/Loadable";
import { getSelectedBlogId, useBlogsSlice } from "features/blogs";
import { selectCurrentBlog, selectCurrentBlogId } from "features/blogs/selectors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { blogsService } from "services/blogs.service";

const GeneralDetails = ({ }) => {
    const dispatch = useDispatch();
    const { actions } = useBlogsSlice()
    const selectedBlog = useSelector(selectCurrentBlog)
    const selectedBlogId = useSelector(selectCurrentBlogId)

    const history = useHistory();

    const onContinueClick = data => async () => {
        blogsService.updateBlog({ id: selectedBlogId, ...data })
        await toast.info("Settings updated successfully!")
    }
    const onPreviousClick = data => () => history.push("/")    
    
    
    console.log({ selectedBlog, selectedBlogId})
  
    useEffect(() => {
        dispatch(
            actions.loadCurrentBlog(undefined)
        )
    }, [ selectedBlogId ])

    if (!selectedBlog) return <LineLoader/>
    return (
        <>
            <GeneralDetailsFeature
                onContinueClick={onContinueClick}
                onPreviousClick={onPreviousClick}
                parentValue={selectedBlog}
                className_=""
                continueLabel="Save"
                previousLabel="Cancel"
            />
        </>
    )
}

export { GeneralDetails };
