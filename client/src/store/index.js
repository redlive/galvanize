
import { applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import reducers from "./reducers";
import logger from 'redux-logger'

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware, logger)
);

export default store;