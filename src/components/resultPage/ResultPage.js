import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWord, storeClear } from '../../actions/index';
import Content from './ContentResultPage';
import Spinner from '../spinner/Spinner';
import Page404 from '../404/404';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './resultPage.scss';
import './resultPageMedia.scss';

function ResultPage() {
  const { wordKey } = useParams();
  console.log(wordKey);
  const dispatch = useDispatch();
  const { dataWord, wordLoadingStatus, fetchingError } = useSelector((state) => state);

  useEffect(() => {
    if (!dataWord.word) {
      dispatch(fetchWord(wordKey));
    }
  }, []);

  const clearStore = () => {
    dispatch(storeClear());
  };

  if (wordLoadingStatus) {
    return <Spinner />;
  }

  if (fetchingError === 404) {
    return <Page404 />;
  }
  if (fetchingError) {
    return <ErrorMessage clearStore={clearStore} />;
  }

  return (
    dataWord.word ? <Content data={dataWord} clearStore={clearStore} /> : null
  );
}

export default ResultPage;
