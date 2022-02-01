import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchWord } from '../../actions/index';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './homePage.scss';
import './homePageMedia.scss';

function HomePage() {
  const { dataWord, wordLoadingStatus, fetchingError } = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateWord = (e, name) => {
    e.preventDefault();
    dispatch(fetchWord(name));
  };
  const spinner = wordLoadingStatus ? <Spinner /> : null;
  const errorMessage = fetchingError ? <ErrorMessage /> : null;
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
      <form onSubmit={(e) => updateWord(e, document.querySelector('input').value)}>
        <label className="word__search-label" htmlFor="word">Введите слово для поиска:</label>
        <div className="word__search-wrapper">
          <input
            id="word"
            name="word"
            type="text"
            required
            placeholder="Enter word"
            title="Разрешено использовать только латинские буквы"
            pattern="^[a-zA-Z]+$"
          />
          <button
            type="submit"
            className="button button__main"
            disabled={wordLoadingStatus}
          >
            <div className="inner">Поиск</div>
          </button>
        </div>
      </form>
      {spinner}
      {results}
      {errorMessage}
    </div>
  );
}

export default HomePage;
