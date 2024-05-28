import { applyMiddleware, combineReducers, compose } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { reducer as Auth } from './Auth/reducer';
import { reducer as App } from './App/reducer';
import { reducer as NewsRoom } from './NewsRoom/reducer'
import { reducer as Service } from './Service/reducer'
import store from './Auth/store'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({ Auth,App,store, NewsRoom,Service })
const redux_store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
export { redux_store }
