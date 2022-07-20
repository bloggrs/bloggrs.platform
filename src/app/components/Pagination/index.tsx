import React from 'react';
import { useLocation } from 'react-router-dom';

/*
    page, pageSize, total_items, count
*/

const Pagination = ({
  page,
  pageSize,
  total_items,
  count,
  setPage,
  queryParams,
}) => {
  const to_ = Math.round(pageSize * page);
  const to = total_items < pageSize && page === 1 ? total_items : to_;
  const from = to === 0 ? 0 : Math.round(pageSize * page) - (pageSize - 1);
  const pages = Math.round(count / pageSize);

  const previousDisabled = page - 1 <= 0;
  const OnPreviousClick = () => (
    <li className="page-item">
      <a
        onClick={e => {
          e.preventDefault();
          setPage(page - 1);
        }}
        className={`page-link ${previousDisabled && 'disabled'}`}
        href="#"
      >
        <span aria-hidden="true">«</span>
        <span className="sr-only">Previous</span>
      </a>
    </li>
  );
  const nextDisabled = page + 1 > pages;
  const OnNextClick = () => (
    <li className="page-item">
      <a
        onClick={e => {
          e.preventDefault();
          setPage(page + 1);
        }}
        className={`page-link ${nextDisabled ? 'disabled' : ''}`}
        href="#"
      >
        <span aria-hidden="true">»</span>
        <span className="sr-only">Next</span>
      </a>
    </li>
  );
  const paginationItems: any = [];
  for (let x = 0; x < pages; x++)
    paginationItems.push(
      <li className={`page-item ${page === x + 1 ? 'active' : ''}`}>
        <a
          className="page-link"
          onClick={e => {
            queryParams.set('page', String(x + 1));
            const newQueryParams = queryParams.toString();
            var newurl =
              window.location.protocol +
              '//' +
              window.location.host +
              window.location.pathname +
              `?${newQueryParams}`;
            window.history.pushState({ path: newurl }, '', newurl);
            setPage(x + 1);
          }}
        >
          {x + 1}
        </a>
      </li>,
    );

  return (
    <div className="mt-3" style={{ display: 'flex' }}>
      <div className="col-sm-12 col-md-5">
        <div
          className="dataTables_info"
          id="datatable_info"
          role="status"
          aria-live="polite"
        >
          Showing {from} to {to} of {count} entries
        </div>
      </div>
      <ul className="pagination mr-auto" style={{ marginLeft: 'auto' }}>
        <OnPreviousClick />
        {paginationItems}
        <OnNextClick />
      </ul>
    </div>
  );
};

export { Pagination };
