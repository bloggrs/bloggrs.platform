import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { categoriesSaga } from './saga';
import { CategoriesState } from './types';

export const initialState: CategoriesState = {
  egPaginatedString: {
    categories: [],
    loading: true,
    error: null,
    _meta: { count: 0 }
  },
};

const slice = createSlice({
  name: 'platform.createPost.categories',
  initialState,
  reducers: {
    loadPostCategories(state, action: PayloadAction<any>) {},
    removeCategory(state, action: PayloadAction<any>) {
      const keys = Object.keys(state);
      const filter_rule = category => category.id !== action.payload.id;
      const new_state = { };
      for (let key of keys) {
        const value: any = state[key];
        if (Array.isArray(value.categories)) {
          value.categories = value.categories.filter(filter_rule)
        } 
        new_state[key] = value
      }
      state = { ...new_state }
    },
    deleteCategory(state, action: PayloadAction<any>) {},
    initSearchIfNotExists(state, action: PayloadAction<any>) {
      const {
        payload: { query, page, pageSize  },
      } = action;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`
      if (state[hash] !== undefined) return;
      state[hash] = {
        categories: [],
        loading: true,
        error: null,
        _meta: undefined
      };
    },
    loaded(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      const { query, page, pageSize, _meta } = action.payload;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`
      state[hash]._meta = _meta;
      state[hash].loading = false;
      state[hash].categories =
        action.payload.categories;
    },
    failed(state, action: PayloadAction<any>) {
      const { query, page, pageSize } = action.payload;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`

      state[hash].loading = false;
      state[hash].error = action.payload.error;
    },
  },
});

export const { actions: categoriesActions } = slice;

export const useCategoriesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: categoriesSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useBlogCategoriesSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
