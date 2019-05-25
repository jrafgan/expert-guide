import {
    FETCH_COCKTAIL_SUCCESS,
    FETCH_ARTIST_SUCCESS,
    FETCH_COCKTAILS_SUCCESS, FETCH_FAILURE,
    FETCH_TRACKS_SUCCESS
} from "../actions/cocktailActions";

const initialState = {
    cocktails: null,
    cocktail: null,
    tracks: null,
    error: null
};

const cocktailReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COCKTAILS_SUCCESS:
            return {...state, cocktails: action.cocktails};

        case FETCH_ARTIST_SUCCESS:
            return {...state, cocktails: action.cocktails};

        case FETCH_COCKTAIL_SUCCESS:
            return {...state, cocktail: action.cocktail};

        case FETCH_TRACKS_SUCCESS:
            return {...state, tracks: action.tracks};

        case FETCH_FAILURE:
            console.log(action.error);
            return {...state, error: action.error};

        default:
            return state;
    }
};

export default cocktailReducer;