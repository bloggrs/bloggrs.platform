import * as React from 'react';
import { useEffect, useState } from 'react';
import { usePostsSlice } from './slice';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, isPostsLoading } from './slice/selectors';
import {
  MainButton,
  ModalContainer,
} from '../../components/DeleteModalContainer';
import { MainPanel } from 'app/components/MainPanel';
import { Table } from 'app/components/Table';
import { EditPostModal } from './EditPostModal';
import { DeletePostModal } from './DeletePostModal';

export const PostsListing = ({ match }) => {
  const history = useHistory();
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
      actions.loadPosts({
        id: blog_id,
        page: loadMoreClicks + 1,
        pageSize: 9999,
      }),
    );
  }, [loadMoreClicks]);

  const EditButton = ({ item }) => (
    <Link to={`/blogs/${params.blog_id}/posts/${item.id}`}>
      <button className="btn-base m-2 bg-transparent border-2 border-yellow-800 text-yellow-800 rounded-md">
        Edit
      </button>
    </Link>
  );
  return (
    <div className="flex">
      <div className="w-screen">
        <div className="flex w-6/6">
          <div className="w-11/12">
            <button
              onClick={e => {
                history.goBack();
              }}
              className="btn-base w-32 bg-white border-2 border-yellow-500 text-yellow-500 rounded-full"
            >
              Back
            </button>
          </div>
          <div className="">
            <Link to={`/blogs/${match.params.blog_id}/posts/create`}>
              <button className=" btn-base w-52 bg-orange-300  text-white rounded-full focus:bg-yellow-500">
                Add Post
              </button>
            </Link>
          </div>
        </div>
        <h1 className="text-3xl text-slate-700 font-medium py-5">Posts</h1>
        {/* <h1 class="text-xl text-slate-400 font-normal py-5">You can change this later anytime.</h1> */}
        <Table
          type="post"
          fields={[
            { key: 'id', label: '#' },
            { key: 'title', label: 'Title' },
            { key: 'slug', label: 'slug' },
          ]}
          EditButton={EditButton}
          DeleteModal={DeletePostModal}
          data={posts}
          onLoadMore={e => setLoadMoreClicks(loadMoreClicks + 1)}
        />
      </div>
    </div>
  );
};