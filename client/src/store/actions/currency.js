export function setDefaultCurrency(currency){
    return function(dispatch){
        dispatch({type: 'SET_DEFAULT_CURRENCY', payload: currency});
    }
};

export function setQuotes(quotes = {}){
    return function(dispatch){
        dispatch({type: 'SET_QUOTES', payload: quotes});
    }
};