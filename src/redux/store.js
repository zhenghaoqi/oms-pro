import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import { RESET_STORE } from './actionTypes';

const appReduer = combineReducers(reducers);
const rootReducer = (state, action) => {
    if (action.type === RESET_STORE) {
        state = undefined;
    }
    return appReduer(state, action);
}
const store = createStore(rootReducer, applyMiddleware());

export default store;