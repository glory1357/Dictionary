import { createReducer } from '@reduxjs/toolkit';

import {
  wordFetching, wordFetched, wordFetchingError, storeClear,
} from '../actions';

const initialState = {
  dataWord: [],
  wordLoadingStatus: false,
  fetchingError: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wordFetching, (state) => {
      state.wordLoadingStatus = true;
      state.fetchingError = null;
    })
    .addCase(wordFetched, (state, action) => {
      state.dataWord = action.payload;
      state.wordLoadingStatus = false;
    })
    .addCase(wordFetchingError, (state, action) => {
      state.wordLoadingStatus = false;
      state.fetchingError = action.payload;
    })
    .addCase(storeClear, (state) => {
      state.fetchingError = false;
      state.dataWord = [];
    })
    .addDefaultCase(() => {});
});
/* eslint no-param-reassign: "error" */

// const reducer = (action, state = initialState) => {
//   switch (action.type) {
//     case 'WORD_FETCHING':
//       return {
//         ...state,
//         wordLoadingStatus: true,
//         fetchingError: null,
//       };
//     case 'WORD_FETCHED':
//       return {
//         ...state,
//         dataWord: action.payload[0],
//         wordLoadingStatus: false,
//       };
//     case 'WORD_FETCHING_ERROR':
//       console.log(action.payload);
//       return {
//         ...state,
//         wordLoadingStatus: false,
//         fetchingError: action.payload,
//       };
//     case 'WORD_STORE_CLEAR':
//       return {
//         dataWord: [],
//         fetchingError: null,
//       };
//     default: return state;
//   }
// };
export default reducer;
