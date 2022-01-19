import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup"
import { Link } from "react-router-dom";

import useWordService from "../../services/WordService";
import ErrorMessage from "../errorMessage/ErrorMessage";

const HomePage = () => {
    const [word, setWord] = useState(null);
    const {getWord, clearError, process, setProcess} = useWordService();

    const onWordLoaded = (word) => {
        setWord(word);
    }

    const updateWord = (name) => {
        // clearError();

        getWord(name)
            .then(onWordLoaded)
            .then(() => setProcess('confirmed'))
    }

    const errorMessage = process === 'error' ? <div className="char__search-critical-erro"><ErrorMessage /></div> : null;
    const results = !word ? null : word.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {word[0].word} page?</div>
                        <Link to={`/${word[0].word}`} className='button button__secondary'>
                            <div className="inner">To page</div>
                        </Link>
                    </div> :
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div> ;
    
    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    word: ""
                }}
                validationSchema = {Yup.object({
                    word: Yup.string().required('This field is required')
                })}
                onSubmit = { ({word}) => {
                    updateWord(word);
                }}
                >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="word"
                            name='word'
                            type='text'
                            placeholder='Enter name'/>
                        <button
                            type='submit'
                            className='button button__main'
                            disabled={process === "loading"}>
                            <div className='inner'>find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="word" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default HomePage;