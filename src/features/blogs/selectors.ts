import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state['blogs'] || initialState;

export const selectBlogs = createSelector([selectSlice], state => state.blogs);
const find_current_blog = id => blog => blog.id === id;
export const selectCurrentBlog = createSelector([selectSlice], state =>
  state.blogs.find(find_current_blog(state.selectedBlogId)),
);
export const selectCurrentBlogId = createSelector(
  [selectSlice],
  state => state.selectedBlogId,
);

export const getIsLoading = createSelector(
  [selectSlice],
  state => state.loading,
);
