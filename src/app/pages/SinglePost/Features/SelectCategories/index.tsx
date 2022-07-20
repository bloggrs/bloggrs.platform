import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useCategoriesSlice } from "./slice";
import debounce from 'debounce';
import { getMetaForPagination, getPaginatedPostCategories } from "./slice/selectors";
import slugify from "slugify";
import { DeleteItemModal } from "app/components/DeleteItemModal";
// import { AdvancedPagination } from "app/components/AdvancedPagination";
import { PageNavigation } from "app/components/PageNavigation";
import moment from "moment";

const CategoriesTable = ({ categories, value, setValue, onChange: _onChange }) => {

    const onChange = e => {
        // e.preventDefault();
        const { value: str } = e.target;
        const value_id = Number(str);

        const found = value.find(val => val === value_id);
        if (found) {
            const newValue = value.filter(val => val !== value_id);
            return setValue(newValue);
        }
        const newValue = value.concat([ value_id ]);
        setValue(newValue);
        _onChange(newValue);
    }
    const isChecked = category => Boolean(
        value.find(value_id => category.id === value_id)
    )
    const CategoryItems = value && categories.map(category => {
        return (
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    value={category.id}
                    onChange={onChange}
                    checked={isChecked(category)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    {category.name}
                </label>
            </div>
        )
    })
    return (
        <div
        className="row"
        style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10, padding: 1, maxHeight: "8vh", overflow: "auto" }}
        >
            <div className="col" style={{ marginLeft: 15 }}>
                {CategoryItems}
            </div>
        </div>
    )
}

export const SelectCategories = ({ initialValue, onChange }) => {
    const { actions } = useCategoriesSlice();

    const history: any = useHistory();
    const { search } = useLocation();

    const queryParams =  React.useMemo(() => new URLSearchParams(search), [search]);

    const qQuery = queryParams.get("q") ? queryParams.get("q") : "";
    const [ value, setValue ] = useState(initialValue || [ ]);

    const [ query, setQuery ] = React.useState(qQuery);
    const onQueryChange = e => {
        e.preventDefault();
        const { value } = e.target;
        setQuery(value);
        queryParams.set("q", value)
        const newQueryParams = queryParams.toString();
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${newQueryParams}`
        history.pushState({path:newurl},'',newurl);
    }

    const pagination = { query } as any
    const categories = useSelector(getPaginatedPostCategories(pagination))

    const [ init, setInit ] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => 
        debounce(() => {
            const query = queryParams.get("q") ? queryParams.get("q") : "";
            dispatch(actions.loadPostCategories({ query }));
          }, 75), [ query, init ]
    )
    useEffect(() => setInit(true), [])
    
    const btnType = value.length ? "primary" : "secondary"

    return (
        <div className="row">
            <div className="input-group col-sm-8 mt-2 col form-label">
                <label className="col-sm-3 mt-2 col form-label">Categories: </label>
                <button className={`btn btn-${btnType}`} type="button" id="button-addon1">
                    <i className="fas fa-search" />
                </button>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search categories.."
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    value={query!}
                    onChange={onQueryChange}
                />
            </div>
            <CategoriesTable
                onChange={onChange} 
                categories={categories}
                value={value}
                setValue={setValue}
            />
        </div>
    )
}