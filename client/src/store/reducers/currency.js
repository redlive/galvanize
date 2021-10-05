export default function reducer(state = {
    active: 'USD',
    quotes: {}
}, action) {
    switch (action.type) {
        case 'SET_DEFAULT_CURRENCY':
            return {
                ...state,
                active: action.payload
            };
        case 'SET_QUOTES':
            return {
                ...state,
                quotes: action.payload
            };
      default:
        return state;
    }
}