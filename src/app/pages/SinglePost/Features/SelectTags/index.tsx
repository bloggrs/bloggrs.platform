import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useTagsSlice } from './slice';
import debounce from 'debounce';
import { getMetaForPagination, getPaginatedTags } from './slice/selectors';
import slugify from 'slugify';
import { DeleteItemModal } from 'app/components/DeleteItemModal';
// import { AdvancedPagination } from "app/components/AdvancedPagination";
import { PageNavigation } from 'app/components/PageNavigation';
import moment from 'moment';

const TagsTable = ({ tags, value, setValue, onChange: _onChange }) => {
  const onChange = e => {
    // e.preventDefault();
    const { value: str } = e.target;
    const value_id = Number(str);

    const found = value.find(val => val === value_id);
    if (found) {
      const newValue = value.filter(val => val !== value_id);
      return setValue(newValue);
    }
    const newValue = value.concat([value_id]);
    setValue(newValue);
    _onChange(newValue);
  };
  const isChecked = tag => Boolean(value.find(value_id => tag.id === value_id));
  const TagItems =
    value &&
    tags.map(tag => {
      return (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={`platform.createPost.tags[${tag.id}]`}
            value={tag.id}
            onChange={onChange}
            checked={isChecked(tag)}
          />
          <label
            className="form-check-label"
            htmlFor={`platform.createPost.tags[${tag.id}]`}
          >
            {tag.name}
          </label>
        </div>
      );
    });
  return (
    <div
      className="row"
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        padding: 1,
        maxHeight: '8vh',
        overflow: 'auto',
      }}
    >
      <div className="col" style={{ marginLeft: 15 }}>
        {TagItems}
      </div>
    </div>
  );
};

export const SelectTags = ({ initialValue, onChange }) => {
  const { actions } = useTagsSlice();

  const history: any = useHistory();
  const { search } = useLocation();

  const queryParams = React.useMemo(
    () => new URLSearchParams(search),
    [search],
  );

  const qQuery = queryParams.get('q') ? queryParams.get('q') : '';
  const [value, setValue] = useState(initialValue || []);

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
    history.pushState({ path: newurl }, '', newurl);
  };

  const pagination = { query } as any;
  const tags = useSelector(getPaginatedTags(pagination));

  const [init, setInit] = useState(false);
  const dispatch = useDispatch();
  useEffect(
    () =>
      debounce(() => {
        const query = queryParams.get('q') ? queryParams.get('q') : '';
        dispatch(actions.loadTags({ query }));
      }, 75),
    [query, init],
  );
  useEffect(() => setInit(true), []);

  const btnType = value.length ? 'primary' : 'secondary';

  return (
    <div className="row">
      <div className="input-group col-sm-8 mt-2 col form-label">
        <label className="col-sm-3 mt-2 col form-label">Tags: </label>
        <button
          className={`btn btn-${btnType}`}
          type="button"
          id="button-addon1"
        >
          <i className="fas fa-search" />
        </button>
        <input
          type="text"
          className="form-control"
          placeholder="Search tags.."
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
          value={query!}
          onChange={onQueryChange}
        />
      </div>
      <TagsTable
        onChange={onChange}
        tags={tags}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};
