import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage as FormikErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { fetchWord } from '../../actions/index';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './homePage.scss';

function HomePage() {
  const { dataWord, wordLoadingStatus, fetchingError } = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateWord = (name) => {
    dispatch(fetchWord(name));
  };
  const spinner = wordLoadingStatus ? <Spinner /> : null;
  const errorMessage = fetchingError ? <div className="word__search-critical-error"><ErrorMessage /></div> : null;
  const results = dataWord.word && !fetchingError && !wordLoadingStatus ? (
    <div className="word__search">
      <div className="word__search-success">
        Нашли слово:
        <span>{dataWord.word}</span>
        ! Посетить страницу?
      </div>
      <Link to={`/${dataWord.word}`} className="button button__secondary">
        <div className="inner">На страницу</div>
      </Link>
    </div>
  ) : null;

  return (
    <div className="word__search-form">
      <Formik
        initialValues={{
          word: '',
        }}
        validationSchema={Yup.object({
          word: Yup.string().required('Введите слово!'),
        })}
        onSubmit={({ word }) => {
          updateWord(word);
        }}
      >
        <Form>
          <label className="word__search-label" htmlFor="word">Введите слово для поиска:</label>
          <div className="word__search-wrapper">
            <Field
              id="word"
              name="word"
              type="text"
              placeholder="Enter word"
            />
            <button
              type="submit"
              className="button button__main"
              disabled={wordLoadingStatus}
            >
              <div className="inner">Поиск</div>
            </button>
          </div>
          <FormikErrorMessage component="div" className="word__search-error" name="word" />
        </Form>
      </Formik>
      {spinner}
      {results}
      {errorMessage}
    </div>
  );
}

export default HomePage;
