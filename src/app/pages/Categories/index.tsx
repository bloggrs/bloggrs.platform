import React from "react";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const Categories = props => {
    const history: any = useHistory();
    const { pathname, search } = useLocation();

    const queryParams =  React.useMemo(() => new URLSearchParams(search), [search]);
      console.log({ queryParams });

    const qShowEntries = !isNaN(Number(queryParams.get("entries"))) ? Number(queryParams.get("entries")) : 10;
    const qQuery = queryParams.get("q") ? queryParams.get("q") : "";
    const qPage = !isNaN(Number(queryParams.get("page"))) ? Number(queryParams.get("page")) :  1;

    const [ showEntries, setShowEntries ] = React.useState(qShowEntries);
    const onShowEntriesChange = e => {
        e.preventDefault();
        const { value } = e.target;
        setShowEntries(
            Number(value)
        )
        queryParams.set("entries", value)
        const newQueryParams = queryParams.toString();
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${newQueryParams}`
        window.history.pushState({path:newurl},'',newurl);

    }
    const [ query, setQuery ] = React.useState(qQuery);
    const onQueryChange = e => {
        e.preventDefault();
        const { value } = e.target;
        setQuery(value);
        queryParams.set("q", value)
        const newQueryParams = queryParams.toString();
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${newQueryParams}`
        window.history.pushState({path:newurl},'',newurl);
    }
    const [ page, setPage ] = React.useState(qPage);
    const onPageChange = e => {
        e.preventDefault();
        const { value } = e.target;
        setPage(value);
    }
    const pages = 5;

    const paginationItems: any = [];
    for (let x = 0; x < pages; x++) paginationItems.push(
        <li className={`page-item ${page === (x + 1) ? "active" : ""}`}>
            <a 
                className="page-link" 
                onClick={e => {
                    queryParams.set("page", String(x + 1))
                    const newQueryParams = queryParams.toString();
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${newQueryParams}`
                    window.history.pushState({path:newurl},'',newurl);
                    setPage(x + 1)
                }}
            >{x + 1}</a>
        </li>
    )
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                <div className="page-title-box">
                    <div className="row">
                    <div className="col">
                        <h4 className="page-title">Categories</h4>
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="javascript:void(0);">Bloggrs</a>
                        </li>
                        <li className="breadcrumb-item active">Categories</li>
                        </ol>
                    </div>
                    <div className="col-auto align-self-center">
                        <a
                        href="#"
                        className="btn btn-sm btn-outline-primary"
                        id="Dash_Date"
                        >
                        <span className="ay-name" id="Day_Name">
                            Today:
                        </span>
                        &nbsp;<span id="Select_date">Jul 12</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-calendar align-self-center icon-xs ms-1"
                        >
                            <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                            <line x1={16} y1={2} x2={16} y2={6} />
                            <line x1={8} y1={2} x2={8} y2={6} />
                            <line x1={3} y1={10} x2={21} y2={10} />
                        </svg>
                        </a>
                        <a href="#" className="btn btn-sm btn-outline-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-download align-self-center icon-xs"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1={12} y1={15} x2={12} y2={3} />
                        </svg>
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div  style={{ display: "flex" }}>
            <div className="mb-1 col-3">
                <div className="dataTables_length col" id="datatable_length">
                <label style={{ display: "flex" }}>
                    <span style={{ marginRight: "2vw", width: 100 }}>Show</span>
                    <select
                    name="datatable_length"
                    aria-controls="datatable"
                    className="form-select form-select-sm"
                    onChange={onShowEntriesChange}
                    >
                    <option selected={showEntries === 10} value={10}>10</option>
                    <option selected={showEntries === 25} value={25}>25</option>
                    <option selected={showEntries === 50} value={50}>50</option>
                    <option selected={showEntries === 100} value={100}>100</option>
                    </select>{" "}
                </label>
                <span className="">entries</span>
                </div>
            </div>
            <div className="" style={{ marginLeft: "auto" }}>
                <div id="datatable_filter" className="dataTables_filter">
                <label style={{ display: "flex" }}>
                    <span style={{ margin: "auto 0.5vw auto 0px", width: 85 }}>Search:</span>
                    <input
                    type="search"
                    className="form-control form-control-sm"
                    placeholder=""
                    aria-controls="datatable"
                    value={query!}
                    onChange={onQueryChange}
                    />
                </label>
                </div>
            </div>
            </div>

            <div className="row mt-1">
                <div className="col">
                <div className="card">
                    <div className="card-body">
                    <div className="table-responsive">
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
                            <tr>
                                <td>#1</td>
                                <td>Personal Notes</td>
                                <td style={{ textTransform: "lowercase" }}>Personal-Notes</td>
                                <td>
                                    <a
                                    className="btn btn-link"
                                    href="/posts?category_name=personal-notes"
                                    >
                                    1
                                    </a>
                                </td>
                                <td>
                                    <a href="#" className="btn btn-link">
                                    Gjergj Kadriu
                                    </a>
                                </td>
                                <td>25/11/2018</td>
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
                                        <a className="dropdown-item" href="#">
                                        Delete
                                        </a>
                                    </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className="mt-3" style={{ display: "flex" }}>
                        <div className="col-sm-12 col-md-5">
                        <div
                            className="dataTables_info"
                            id="datatable_info"
                            role="status"
                            aria-live="polite"
                        >
                            Showing 1 to 10 of 10 entries
                        </div>
                        </div>
                        <ul className="pagination mr-auto" style={{ marginLeft: "auto" }}>
                        <li className="page-item">
                                                  <a className="page-link" href="#" aria-label="Previous">
                                                      <span aria-hidden="true">«</span>
                                                      <span className="sr-only">Previous</span>
                                                  </a>
                                              </li>
                            {paginationItems}
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">»</span>
                            <span className="sr-only">Next</span>
                            </a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>{" "}
            </div>
        </div>
    )
}