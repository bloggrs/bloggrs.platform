import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useTagsSlice } from './slice';
import debounce from 'debounce';
import {
  getMetaForPagination,
  getpaginatedTags,
} from './slice/selectors';
import slugify from 'slugify';
import { DeleteItemModal } from 'app/components/DeleteItemModal';
import { Pagination } from '../../components/Pagination';
import { AdvancedPagination } from 'app/components/AdvancedPagination';
import { PageNavigation } from 'app/components/PageNavigation';
import moment from 'moment';

const TagsTable = ({ tags, dispatch, action }) => {
  return (
    <table className="table table-striped mb-0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Slug</th>
          <th>Count</th>
          <th>Created By</th>
          <th>Created at</th>
          <th className="text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        {tags.map(tag => (
          <tr>
            <td>#{tag.id}</td>
            <td>{tag.name}</td>
            <td style={{ textTransform: 'lowercase' }}>
              {slugify(tag.name)}
            </td>
            <td>
              <Link
                className="btn btn-link"
                to={`/posts?tag_name=${tag.name}`}
              >
                1
              </Link>
            </td>
            <td>
              <Link to={`/users/${tag.UserId}`} className="btn btn-link">
                Gjergj Kadriu
              </Link>
            </td>
            <td>{moment(tag.createdAt).format('DD/MM/YYYY HH:mm')}</td>
            <td className="text-right">
              <div className="dropdown d-inline-block">
                <a
                  className="dropdown-toggle arrow-none"
                  id="dLabel11"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <i className="las la-ellipsis-v font-20 text-muted" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dLabel11"
                >
                  <a className="dropdown-item" href="#">
                    View/Edit
                  </a>
                  <DeleteItemModal
                    header="Delete confirmation"
                    title={`Delete "${tag.name}" tag`}
                    onDelete={() => {
                      dispatch(action({ id: tag.id }));
                    }}
                  >
                    {({ toggle }) => {
                      return (
                        <a onClick={toggle} className="dropdown-item" href="#">
                          Delete
                        </a>
                      );
                    }}
                  </DeleteItemModal>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const Tags = props => {
  const { actions } = useTagsSlice();

  const history: any = useHistory();
  const { search } = useLocation();

  const queryParams = React.useMemo(
    () => new URLSearchParams(search),
    [search],
  );

  const qShowEntries =
    !isNaN(Number(queryParams.get('entries'))) &&
    !(Number(queryParams.get('entries')) === 0)
      ? Number(queryParams.get('entries'))
      : 10;
  const qQuery = queryParams.get('q') ? queryParams.get('q') : '';
  const qPage =
    !isNaN(Number(queryParams.get('page'))) &&
    !(Number(queryParams.get('page')) === 0)
      ? Number(queryParams.get('page'))
      : 1;

  const [showEntries, setShowEntries] = React.useState(qShowEntries);
  const onShowEntriesChange = e => {
    e.preventDefault();
    const { value: str_value } = e.target;
    const value = Number(str_value);
    setShowEntries(value);
    queryParams.set('entries', str_value);
    const newQueryParams = queryParams.toString();
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      `?${newQueryParams}`;
    window.history.pushState({ path: newurl }, '', newurl);
  };
  const [query, setQuery] = React.useState(qQuery);
  const onQueryChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setQuery(value);
    queryParams.set('q', value);
    const newQueryParams = queryParams.toString();
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      `?${newQueryParams}`;
    window.history.pushState({ path: newurl }, '', newurl);
  };
  const [page, setPage] = React.useState(qPage);

  const pagination = { query, page, pageSize: showEntries } as any;
  const tags = useSelector(getpaginatedTags(pagination));

  const [init, setInit] = useState(false);
  const dispatch = useDispatch();
  useEffect(
    () =>
      debounce(() => {
        const pageSize =
          !isNaN(Number(queryParams.get('entries'))) &&
          !(Number(queryParams.get('entries')) === 0)
            ? Number(queryParams.get('entries'))
            : 10;
        const query = queryParams.get('q') ? queryParams.get('q') : '';
        const page =
          !isNaN(Number(queryParams.get('page'))) &&
          !(Number(queryParams.get('page')) === 0)
            ? Number(queryParams.get('page'))
            : 1;
        dispatch(actions.loadTags({ query, pageSize, page }));
      }, 75),
    [query, showEntries, page, init],
  );
  useEffect(() => setInit(true), []);

  const meta = useSelector(getMetaForPagination(pagination));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <div className="row">
              <PageNavigation
                label="Tags"
                items={[
                  {
                    label: 'Tags',
                    active: true,
                  },
                ]}
              />
              <div className="col-auto align-self-center">
                <div className="btn btn-sm btn-outline-warning"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdvancedPagination
        query={query}
        onQueryChange={onQueryChange}
        onShowEntriesChange={onShowEntriesChange}
        showEntries={showEntries}
      />

      <div className="row mt-1">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <TagsTable
                  tags={tags}
                  dispatch={dispatch}
                  action={actions.deleteTag}
                />
              </div>
              <Pagination
                page={page}
                pageSize={pagination.pageSize}
                total_items={tags.length}
                count={meta?.count || 0}
                setPage={setPage}
                queryParams={queryParams}
              />
            </div>
          </div>
        </div>{' '}
      </div>
    </div>
  );
};
