import axios from "axios"

export const fetchWord = (name) => async(dispatch) => {
    dispatch(wordFetching());
    await axios.get(`http://api.dictionaryapi.dev/api/v2/entries/en/${name}`)
        .then(res => dispatch(wordFetched(res.data)))
        .catch((err) => dispatch(wordFetchingError(err)));
}

export const wordFetching = () => {
    return {
        type: 'WORD_FETCHING'
    }
}

export const wordFetched = (word) => {
    return {
        type: 'WORD_FETCHED',
        payload: word
    }
}

export const wordFetchingError = (err) => {
    return {
        type: 'WORD_FETCHING_ERROR',
        payload: err
    }
}

export const wordClear = () => {
    return {
        type: 'WORD_STORE_CLEAR'
    }
}