import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { mediasSaga } from './saga';
import { MediasState } from './types';

export const initialState: MediasState = {
  egPaginatedString: {
    medias: [],
    loading: true,
    error: null,
    _meta: { count: 0 },
  },
};

const slice = createSlice({
  name: 'medias',
  initialState,
  reducers: {
    loadMedias(state, action: PayloadAction<any>) {},
    initSearchIfNotExists(state, action: PayloadAction<any>) {
      const {
        payload: { query, page, pageSize },
      } = action;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
      if (state[hash] !== undefined) return;
      state[hash] = {
        medias: [],
        loading: true,
        error: null,
        _meta: undefined,
      };
    },
    addMedia(state, action: PayloadAction<any>) {
      const media = action.payload;
      const hashes = Object.keys(state);
      for (let hash of hashes) {
        state[hash].medias.push(media);
      }
    },
    loaded(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      const { query, page, pageSize, _meta } = action.payload;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
      state[hash]._meta = _meta;
      state[hash].loading = false;
      state[hash].medias = action.payload.medias;
    },
    failed(state, action: PayloadAction<any>) {
      const { query, page, pageSize } = action.payload;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;

      state[hash].loading = false;
      state[hash].error = action.payload.error;
    },
  },
});

export const { actions: mediasActions } = slice;

export const useMediasSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: mediasSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useBlogMediasSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
