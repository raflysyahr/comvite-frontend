import { combineReducers, configureStore } from "@reduxjs/toolkit"
import logger from 'redux-logger';
import comicReducer from './reducer/ComicReducer';

const reducer = combineReducers({
    comic:comicReducer
})

const reduxStore = configureStore({reducer,middleware:(midle)=> import.meta.env.MODE === 'development' ? midle({
        immutableCheck: false,
        serializableCheck: false,
    }).concat(logger)  : midle({
        immutableCheck: false,
        serializableCheck: false,
    })
})


export default reduxStore
