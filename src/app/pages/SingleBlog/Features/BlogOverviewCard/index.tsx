import * as React from 'react';
import { useEffect } from 'react';
import { useBlogSlice } from './slice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlog, isBlogLoading } from './slice/selectors';

export const BlogOverviewCard = () => {
  const dispatch = useDispatch();
  const { actions } = useBlogSlice();
  const params: any = useParams();
  const { blog_id } = params;
  const blog = useSelector(getBlog);
  const loading = useSelector(isBlogLoading);
  useEffect(() => {
    dispatch(actions.loadBlog({ id: blog_id }));
  }, []);
  if (loading) return <>'Loading...'</>;
  return <>{JSON.stringify(blog)}</>;
};
