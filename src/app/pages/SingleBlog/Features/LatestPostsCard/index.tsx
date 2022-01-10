import * as React from 'react';
import { useEffect } from 'react';
import { usePostsSlice } from './slice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, isPostsLoading } from './slice/selectors';

export const LatestPostsCard = () => {
  const dispatch = useDispatch();
  const { actions } = usePostsSlice();
  const params: any = useParams();
  const { blog_id } = params;
  const posts = useSelector(getPosts);
  const loading = useSelector(isPostsLoading);
  useEffect(() => {
    dispatch(actions.loadPosts({ id: blog_id, pageSize: 3 }));
  }, []);
  if (loading) return <>'Loading...'</>;
  return <>{JSON.stringify(posts)}</>;
};
