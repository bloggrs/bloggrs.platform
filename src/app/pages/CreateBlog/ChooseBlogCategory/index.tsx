import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useBlogCategoriesSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'debounce';
import { getBlogsForQuery } from './slice/selectors';

export const ChooseBlogCategory = ({ sendValueToParent, nextStep }) => {
  const { actions } = useBlogCategoriesSlice();
  const [blogCategoryId, setBlogCategoryId] = useState(-1);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  useEffect(
    debounce(() => {
      dispatch(actions.loadBlogCategories({ query }));
    }, 75),
    [query],
  );
  const handleSubmit = e => {
    e.preventDefault();
    sendValueToParent(blogCategoryId);
    nextStep();
  };
  const blogCategories = useSelector(getBlogsForQuery(query));
  return (
    <>
      <h1>Choose blog category</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName"></label>
        <input
          id="search"
          name="search"
          type="text"
          onChange={e => setQuery(e.target.value)}
          value={query}
        />

        <button type="submit">Submit</button>
        <ul>
          {blogCategories.map(bg => (
            <li
              style={{
                fontWeight: blogCategoryId === bg.id ? 'bold' : '',
              }}
              onClick={() => setBlogCategoryId(bg.id)}
            >
              #{bg.id} - {bg.name}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};
