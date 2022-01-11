import * as React from 'react';
import { useEffect, useState } from 'react';
import { useCommentsSlice } from './slice';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, isCommentsLoading } from './slice/selectors';
import {
  MainButton,
  ModalContainer,
} from '../../components/DeleteModalContainer';
import { MainPanel } from 'app/components/MainPanel';
import { Table } from 'app/components/Table';

export const CommentsListing = ({ match }) => {
  const history = useHistory();
  const [data, setData] = useState({ onDelete: 0 });

  const [loadMoreClicks, setLoadMoreClicks] = useState(0);
  const dispatch = useDispatch();
  const { actions } = useCommentsSlice();
  const params: any = useParams();
  const { blog_id } = params;
  const comments = useSelector(getComments);
  const loading = useSelector(isCommentsLoading);
  const onDelete = () => {
    dispatch(actions.deleteComment({ id: data.onDelete }));
  };
  useEffect(() => {
    dispatch(
      actions.loadComments({
        id: blog_id,
        page: loadMoreClicks + 1,
        pageSize: 3,
      }),
    );
  }, [loadMoreClicks]);
  return (
    <MainPanel className="px-52 py-12">
      <div className="flex -mx-2">
        <div className="w-full w-6/6 lg:w-6/6 px-2">
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
          </div>
          <h1 className="text-3xl text-slate-700 font-medium py-5">Comments</h1>
          {/* <h1 class="text-xl text-slate-400 font-normal py-5">You can change this later anytime.</h1>       */}
          <Table
            fields={[
              { key: 'id', label: '#' },
              { key: 'content', label: 'Content' },
            ]}
            data={comments}
            onLoadMore={e => setLoadMoreClicks(loadMoreClicks + 1)}
          />
        </div>
      </div>
    </MainPanel>
  );
};
