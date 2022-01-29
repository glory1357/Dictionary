import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup"
import { Link } from "react-router-dom";

import {wordFetching, wordFetched, wordFetchingError} from '../../actions/index';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {useHttp} from '../../hooks/http.hook';

import './homePage.scss';

const HomePage = () => {
    const {word, wordLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const updateWord = (name) => {
        dispatch(wordFetching());
        request(`http://api.dictionaryapi.dev/api/v2/entries/en/${name}`)
            .then(data => dispatch(wordFetched(data)))
            .catch(() => dispatch(wordFetchingError()));
    };
    const spinner = wordLoadingStatus === 'loading' ? <Spinner/> : null;
    const errorMessage = wordLoadingStatus === 'error' ? <div className="word__search-critical-error"><ErrorMessage /></div> : null;
    const results = !word[0]|| wordLoadingStatus === 'error' ? null :
                    <div className="word__search">
                        <div className="word__search-success">Нашли слово: <span>{word[0].word}</span>! Посетить страницу?</div>
                        <Link to={`/${word[0].word}`} className='button button__secondary'>
                            <div className="inner">На страницу</div>
                        </Link>
                    </div> 
    
    return (
        <div className="word__search-form">
            <Formik
                initialValues = {{
                    word: ""
                }}
                validationSchema = {Yup.object({
                    word: Yup.string().required('Введите слово!')
                })}
                onSubmit = { ({word}) => {
                    updateWord(word);
                }}
                >
                <Form>
                    <label className="word__search-label" htmlFor="word">Введите слово для поиска:</label>
                    <div className="word__search-wrapper">
                        <Field
                            id="word"
                            name='word'
                            type='text'
                            placeholder='Enter word'/>
                        <button
                            type='submit'
                            className='button button__main'
                            disabled={wordLoadingStatus=='loading'}>
                            <div className='inner'>Поиск</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="word__search-error" name="word" />
                </Form>
            </Formik>
            {spinner}
            {results}
            {errorMessage}
        </div>
    )
}

export default HomePage;