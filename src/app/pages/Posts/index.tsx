import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { usePostsSlice } from './slice';
import debounce from 'debounce';
import { getMetaForPagination, getPaginatedPosts } from './slice/selectors';
import slugify from 'slugify';
import { DeleteItemModal } from 'app/components/DeleteItemModal';
import { Pagination } from '../../components/Pagination';
import { AdvancedPagination } from 'app/components/AdvancedPagination';
import { PageNavigation } from 'app/components/PageNavigation';
import moment from 'moment';

const PostItems = ({ categories }) => {
  return (
    <div className="row">
      {categories.map(category => (
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="blog-card">
                <img
                  src="/assets/images/small/img-1.jpg"
                  alt=""
                  className="img-fluid rounded"
                />
                <span className="badge badge-purple px-3 py-2 bg-soft-primary fw-semibold mt-3">
                  Photography
                </span>
                <h4 className="my-3">
                  <a>There are many variations of passages of Lorem</a>
                </h4>
                <p className="text-muted">
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Cum sociis natoque
                  penatibus et magnis.
                </p>
                <hr className="hr-dashed" />
                <div className="d-flex justify-content-between">
                  <div className="meta-box">
                    <div className="media">
                      <Link to={`/users/${category.UserId}`}>
                        <img
                          src="/assets/images/users/user-5.jpg"
                          alt=""
                          className="thumb-sm rounded-circle me-2"
                        />
                      </Link>
                      <div className="media-body align-self-center text-truncate">
                        <Link to={`/users/${category.UserId}`}>
                          <h6 className="m-0 text-dark">Donald Gardner</h6>
                        </Link>
                        <ul className="p-0 list-inline mb-0">
                          <li className="list-inline-item">26 mars 2020</li>
                          <li className="list-inline-item">
                            by <a>admin</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <Link className="text-dark" to={`/posts/${category.id}`}>
                      Read more <i className="fas fa-long-arrow-alt-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Posts = props => {
  const { actions } = usePostsSlice();

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
  const categories = useSelector(getPaginatedPosts(pagination));

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
        dispatch(actions.loadPosts({ query, pageSize, page }));
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
                label="Posts"
                items={[
                  {
                    label: 'Posts',
                    to: '/posts',
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
        style={{ marginBottom: '1.5vh' }}
      />

      <div className="row mt-1">
        <div className="col">
          <PostItems categories={categories} />
          <Pagination
            page={page}
            pageSize={pagination.pageSize}
            total_items={categories.length}
            count={meta?.count || 0}
            setPage={setPage}
            queryParams={queryParams}
          />
        </div>{' '}
      </div>
    </div>
  );
};
