import React from "react";

const AdvancedPagination = ({ showEntries, onShowEntriesChange, query, onQueryChange }) => {
    return (
        <div  style={{ display: "flex" }}>
            <div className="mb-1 col-3">
                <div className="" id="">
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
    )
}

export { AdvancedPagination };