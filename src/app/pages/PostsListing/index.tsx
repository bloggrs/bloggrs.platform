import * as React from 'react';
import { useEffect, useState } from 'react';
import { usePostsSlice } from './slice';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, isPostsLoading } from './slice/selectors';
import {
  MainButton,
  ModalContainer,
} from '../../components/DeleteModalContainer';

export const PostsListing = () => {
  const [data, setData] = useState({ onDelete: 0 });

  const [loadMoreClicks, setLoadMoreClicks] = useState(0);
  const dispatch = useDispatch();
  const { actions } = usePostsSlice();
  const params: any = useParams();
  const { blog_id } = params;
  const posts = useSelector(getPosts);
  const loading = useSelector(isPostsLoading);
  const onDelete = () => {
    dispatch(actions.deletePost({ id: data.onDelete }));
  };
  useEffect(() => {
    dispatch(
      actions.loadPosts({ id: blog_id, page: loadMoreClicks + 1, pageSize: 3 }),
    );
  }, [loadMoreClicks]);
  if (loading) return <>'Loading...'</>;
  return (
    <>
      <Link to={`/blogs/${blog_id}/posts/create`}>
        <button>Create</button>
      </Link>
      <ul>
        {posts.map(p => (
          <li>
            #{p.id}/{p.title} -{' '}
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setData({ onDelete: p.id });
              }}
            >
              Delete
            </a>
          </li>
        ))}
      </ul>
      <br />
      <button onClick={e => setLoadMoreClicks(loadMoreClicks + 1)}>More</button>
      <hr />
      {!data.onDelete ? null : (
        <ModalContainer
          // {...props}
          close={() => setData({ onDelete: 0 })}
          onDelete={onDelete}
          name={posts.find(p => p.id == data.onDelete)?.title}
          type="post"
        />
      )}
    </>
  );
};
