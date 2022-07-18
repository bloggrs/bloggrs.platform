import * as React from 'react';
import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useBlogsSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'debounce';
import { selectBlogs, getIsLoading } from './slice/selectors';
import { MainPanel } from 'app/components/MainPanel';
import slugify from 'slugify';


export const SelectBlog = ({
}) => {
  const history = useHistory();
  const { actions } = useBlogsSlice();

  const blogs = useSelector(selectBlogs);
  const loading = useSelector(getIsLoading);

  const onSelectClick = e => {
    e.preventDefault();
  }

  const dispatch = useDispatch();

  useEffect(
    () => dispatch(actions.loadBlogs() as any), []
  );
  if (loading) return <></>
  if (!blogs.length) return <Redirect to="/blogs/create" />

  const onCreateClick = () => history.push("/blogs/create")
  const onChange = e => {
    const { value } = e.target;
    if (value == "create") return onCreateClick();
  }
  return (
    <div className="col-9 select-blog">
      <select onChange={onChange} className="form-select" aria-label="Default select example">
          {
            blogs.map(blog => (
              <option value={blog.id}>{blog.name}</option>
            ))
          }
          <option value="create">Create</option>
      </select>
    </div>
  )
};
