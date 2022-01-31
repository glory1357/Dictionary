import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

export const wordFetching = createAction('WORD_FETCHING');

export const wordFetched = createAction('WORD_FETCHED');

export const wordFetchingError = createAction('WORD_FETCHING_ERROR');

export const storeClear = createAction('STORE_STORE_CLEAR');

export const fetchWord = (name) => async (dispatch) => {
  dispatch(wordFetching());
  await axios.get(`http://api.dictionaryapi.dev/api/v2/entries/en/${name}`)
    .then((res) => dispatch(wordFetched(res.data[0])))
    .catch((err) => dispatch(wordFetchingError(err.response ? err.response.status : true)));
};
