const initialState = {
    word: [],
    wordLoadingStatus: 'idle'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WORD_FETCHING':
            return {
                ...state,
                wordLoadingStatus: 'loading'
            }
        case 'WORD_FETCHED':
            return {
                word: action.payload[0],
                wordLoadingStatus: 'idle'
            }
        case 'WORD_FETCHING_ERROR':
            return {
                ... state,
                wordLoadingStatus: 'error'
            }
        case 'WORD_FETCH_CLEAR':
            return {
                word: [],
                wordLoadingStatus: 'idle'
            }
        default: return state
    }
}
export default reducer;