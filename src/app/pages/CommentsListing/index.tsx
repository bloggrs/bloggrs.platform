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
      !!state.auth.token && state['commentsListing.comments']?.isAuthorized !== false,
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

  if (!isAuthorized || (commentsError && !loading)) {
    return <NotAuthorized />;
  }

  const EditButton = ({ item }) => (
    <Link to={`/blogs/${params.blog_id}/comments/${item.id}`}>
      <button className="btn-base m-2 bg-transparent border-2 border-yellow-800 text-yellow-800 rounded-md">
        Edit
      </button>
    </Link>
  );

  return (
    <div className="flex flex-col p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <button
          onClick={e => {
            history.goBack();
          }}
          className="btn-base px-6 py-2 mb-4 sm:mb-0 bg-white border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
        >
          Back
        </button>

        <Link to={`/blogs/${match.params.blog_id}/comments/create`}>
          <button className="btn-base px-8 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors shadow-sm">
            Add Comment
          </button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl text-slate-700 font-medium">
            Comments
          </h1>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1 text-sm border rounded-full text-gray-600 hover:bg-gray-50">
              Categories
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Quick search..."
                className="w-full sm:w-64 px-4 py-2 pl-10 bg-gray-50 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>
        </div>
      </div>

      <Table
        type="comment"
        fields={[
          { key: 'id', label: '#' },
          { key: 'content', label: 'Content' },
          { key: 'PostId', label: 'Post ID' },
        ]}
        EditButton={EditButton}
        data={comments || []}
        onLoadMore={(e: any) => setLoadMoreClicks(loadMoreClicks + 1)}
      />
    </div>
  );
};
