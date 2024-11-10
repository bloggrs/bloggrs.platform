import * as React from 'react';
import { useEffect, useState } from 'react';
import { useCommentsSlice } from './slice';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, isCommentsLoading } from './slice/selectors';
import { Table } from 'app/components/Table';
import { NotAuthorized } from 'app/components/NotAuthorized';

interface RootState {
  auth: {
    user?: any;
    token?: string;
    loading: boolean;
    error?: any;
  };
  commentsListing: {
    comments: {
      error?: Error;
      loading: boolean;
      comments: any[];
      deleteLoading: boolean;
      isAuthorized?: boolean;
    };
  };
}

export const CommentsListing = ({ match }) => {
  const history = useHistory();
  const [loadMoreClicks, setLoadMoreClicks] = useState(0);

  const dispatch = useDispatch();
  const { actions } = useCommentsSlice();
  const params: any = useParams();
  const { blog_id } = params;
  const comments = useSelector(getComments);
  const loading = useSelector(isCommentsLoading);
  const authState = useSelector((state: RootState) => state.auth);

  const commentsError = useSelector(
    (state: RootState) => state.commentsListing?.comments?.error,
  );
  const isAuthorized = useSelector(
    (state: RootState) =>
      !!state.auth.token &&
      state['commentsListing.comments']?.isAuthorized !== false,
  );

  useEffect(() => {
    if (isAuthorized && blog_id) {
      dispatch(
        actions.loadComments({
          id: blog_id,
          page: loadMoreClicks + 1,
          pageSize: 20,
        }),
      );
    }
  }, [loadMoreClicks, isAuthorized, blog_id]);

  const EditButton = ({ item }) => (
    <Link to={`/blogs/${params.blog_id}/comments/${item.id}`}>
      <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#f4a261] hover:text-[#e76f51] transition-colors">
        Edit
      </button>
    </Link>
  );

  if (!isAuthorized || (commentsError && !loading)) {
    return <NotAuthorized />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-[#f4a261] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ marginTop: '3%' }}>
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => history.goBack()}
              className="flex items-center text-[#f4a261] hover:text-[#e76f51] transition-colors"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">Comments</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search comments..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <Link to={`/blogs/${match.params.blog_id}/comments/create`}>
              <button className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors">
                Add Comment
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <Table
            type="comment"
            fields={[
              { key: 'id', label: '#' },
              { key: 'content', label: 'Content' },
              { key: 'PostId', label: 'Post ID' },
            ]}
            EditButton={EditButton}
            data={comments || []}
            onLoadMore={() => setLoadMoreClicks(loadMoreClicks + 1)}
          />
        </div>
      </div>
    </div>
  );
};
