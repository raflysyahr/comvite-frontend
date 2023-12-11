import config from "../../../config/www.config";


const initializeReducer =  {
    comic:[],
    last_updated_comic:[],
    history_comic:[],
    popular_comic:[]
}


export default (state=initializeReducer,action)=>{
    switch (action.type) {
        case config.redux.comic.comic:
            return {
                ...state,
                comic:action.payload
            }
            break;
        case config.redux.comic.last_updated_comic:
            return {
                ...state,
                last_updated_comic:action.payload
            }
            break;
        case config.redux.comic.history_comic:
            return {
                ...state,
                history_comic:action.payload
            }
            break;
        case config.redux.comic.popular_comic:
            return {
                ...state,
                popular_comic:action.payload
            }
            break;
        default:
            return state
            break;
    }
}