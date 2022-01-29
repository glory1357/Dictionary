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

export const wordFetchingError = () => {
    return {
        type: 'WORD_FETCHING_ERROR'
    }
}

export const wordClear = () => {
    return {
        type: 'WORD_FETCH_CLEAR'
    }
}