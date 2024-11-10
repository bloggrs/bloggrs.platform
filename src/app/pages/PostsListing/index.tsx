import * as React from 'react';
import { useEffect, useState } from 'react';
import { usePostsSlice } from './slice';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, isPostsLoading } from './slice/selectors';
import { Table } from 'app/components/Table';
import { DeletePostModal } from './DeletePostModal';
import { NotAuthorized } from 'app/components/NotAuthorized';
import { MoreHorizontal, ChevronLeft, Search } from 'lucide-react';

// Update the interface to match your actual state structure
interface RootState {
  auth: {
    user?: any;
    token?: string;
    loading: boolean;
    error?: any;
  };
  postsListing: {
    posts: {
      error?: Error;
      loading: boolean;
      posts: any[];
      deleteLoading: boolean;
      isAuthorized?: boolean;
    };
  };
}

export const PostsListing = ({ match }) => {
  const history = useHistory();
  const [loadMoreClicks, setLoadMoreClicks] = useState(0);

  const dispatch = useDispatch();
  const { actions } = usePostsSlice();
  const params: any = useParams();
  const { blog_id } = params;
  const posts = useSelector(getPosts);
  const loading = useSelector(isPostsLoading);
  const authState = useSelector((state: RootState) => state.auth);
  console.log('Detailed auth state:', authState);

  const postsError = useSelector(
    (state: RootState) => state.postsListing?.posts?.error,
  );
  const isAuthorized = useSelector(
    (state: RootState) =>
      !!state.auth.token && state['postsListing.posts']?.isAuthorized !== false,
  );

  useEffect(() => {
    if (isAuthorized && blog_id) {
      dispatch(
        actions.loadPosts({
          id: blog_id,
          page: loadMoreClicks + 1,
          pageSize: 20,
        }),
      );
    }
  }, [loadMoreClicks, isAuthorized, blog_id]);

  if (!isAuthorized || (postsError && !loading)) {
    return <NotAuthorized />;
  }

  const EditButton = ({ item }) => (
    <Link to={`/blogs/${params.blog_id}/posts/${item.id}`}>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-gray-50" style={{ marginTop: '3%' }}>
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => history.goBack()}
                className="flex items-center text-[#f4a261] hover:text-[#e76f51] transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">Posts</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <Link to={`/blogs/${match.params.blog_id}/posts/create`}>
                <button className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors">
                  Add Post
                </button>
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <Table
              type="post"
              fields={[
                { key: 'id', label: '#' },
                { key: 'title', label: 'Title' },
                { key: 'slug', label: 'Slug' },
              ]}
              EditButton={EditButton}
              DeleteModal={DeletePostModal}
              data={posts || []}
              onLoadMore={(e: any) => setLoadMoreClicks(loadMoreClicks + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
