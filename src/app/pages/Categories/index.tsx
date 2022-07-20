import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useCategoriesSlice } from './slice';
import debounce from 'debounce';
import {
  getMetaForPagination,
  getPaginatedPostCategories,
} from './slice/selectors';
import slugify from 'slugify';
import { DeleteItemModal } from 'app/components/DeleteItemModal';
import { Pagination } from '../../components/Pagination';
import { AdvancedPagination } from 'app/components/AdvancedPagination';
import { PageNavigation } from 'app/components/PageNavigation';
import moment from 'moment';

const CategoriesTable = ({ categories, dispatch, action }) => {
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
        {categories.map(category => (
          <tr>
            <td>#{category.id}</td>
            <td>{category.name}</td>
            <td style={{ textTransform: 'lowercase' }}>
              {slugify(category.name)}
            </td>
            <td>
              <Link
                className="btn btn-link"
                to={`/posts?category_name=${category.name}`}
              >
                1
              </Link>
            </td>
            <td>
              <Link to={`/users/${category.UserId}`} className="btn btn-link">
                Gjergj Kadriu
              </Link>
            </td>
            <td>{moment(category.createdAt).format('DD/MM/YYYY HH:mm')}</td>
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
                    title={`Delete "${category.name}" category`}
                    onDelete={() => {
                      dispatch(action({ id: category.id }));
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

export const Categories = props => {
  const { actions } = useCategoriesSlice();

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
  const categories = useSelector(getPaginatedPostCategories(pagination));

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
        dispatch(actions.loadPostCategories({ query, pageSize, page }));
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
                label="Categories"
                items={[
                  {
                    label: 'Categories',
                    to: '/categories',
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
                <CategoriesTable
                  categories={categories}
                  dispatch={dispatch}
                  action={actions.deleteCategory}
                />
              </div>
              <Pagination
                page={page}
                pageSize={pagination.pageSize}
                total_items={categories.length}
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
