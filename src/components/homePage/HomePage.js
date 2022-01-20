import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup"
import { Link } from "react-router-dom";

import useWordService from "../../services/WordService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './homePage.scss';

const HomePage = () => {
    const [word, setWord] = useState(null);
    const {getWord, clearError, process, setProcess} = useWordService();

    const onWordLoaded = (word) => {
        setWord(word);
    }

    const updateWord = (name) => {
        clearError();

        getWord(name)
            .then(onWordLoaded)
            .then(() => setProcess('confirmed'))
    }

    const errorMessage = process === 'error' ? <div className="word__search-critical-error"><ErrorMessage /></div> : null;
    const results = !word || process === 'error' ? null : word.length > 0 ?
                    <div className="word__search">
                        <div className="word__search-success">Нашли слово: <span>{word[0].word}</span>! Посетить страницу?</div>
                        <Link to={`/${word[0].word}`} className='button button__secondary'>
                            <div className="inner">На страницу</div>
                        </Link>
                    </div> :
                    <div className="word__search-error">
                        The character was not found. Check the name and try again
                    </div> ;
    
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
                            disabled={process === "loading"}>
                            <div className='inner'>Поиск</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="word__search-error" name="word" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default HomePage;