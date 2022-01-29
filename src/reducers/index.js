const initialState = {
    word: [],
    wordLoadingStatus: false,
    fetchingError: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WORD_FETCHING':
            return {
                ...state,
                wordLoadingStatus: true,
                fetchingError:null
            }
        case 'WORD_FETCHED':
            return {
                ...state,
                word: action.payload[0],
                wordLoadingStatus: false
            }
        case 'WORD_FETCHING_ERROR':
                console.log(action.payload)
            return {
                ... state,
                wordLoadingStatus: false,
                fetchingError: action.payload
            }
        case 'WORD_STORE_CLEAR':
            return {
                word: [],
                fetchingError: null
            }
        default: return state
    }
}
export default reducer;