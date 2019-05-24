import axios from '../../axios-api';
import {push} from "connected-react-router";

export const FETCH_COCKTAILS_SUCCESS = 'FETCH_COCKTAILS_SUCCESS';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_COCKTAIL_SUCCESS = 'FETCH_COCKTAIL_SUCCESS';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKSBYARTIST_SUCCESS = 'FETCH_TRACKSBYARTIST_SUCCESS';
export const FETCH_TRACKSBYALBUM_SUCCESS = 'FETCH_TRACKSBYALBUM_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const fetchCocktailsSuccess = cocktails => ({type: FETCH_COCKTAILS_SUCCESS, cocktails});
export const fetchArtistSuccess = cocktail => ({type: FETCH_ARTIST_SUCCESS, artist: cocktail});
export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const fetchCocktailSuccess = cocktail => ({type: FETCH_COCKTAIL_SUCCESS, cocktail});
export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});
export const fetchTracksByArtistSuccess = tracks => ({type: FETCH_TRACKSBYARTIST_SUCCESS, tracks});
export const fetchTracksByAlbumSuccess = tracks => ({type: FETCH_TRACKSBYALBUM_SUCCESS, tracks});
export const fetchFailure = error => ({type: FETCH_FAILURE, error});

export const getCocktails = id => {
    return dispatch => {
        let path = '/cocktails';

        if (id) {
            path += '?user=' + id;
        }
        return axios.get(path).then(
            response => {
                console.log('this is cocktails', response.data);
                dispatch(fetchCocktailsSuccess(response.data));
            });
    }
};
export const getAlbums = artistId => {
    return dispatch => {
        let path = '/albums';

        if (artistId) {
            path += '?cocktail=' + artistId;
        }
        return axios.get(path).then(
            response => {
                dispatch(fetchAlbumsSuccess(response.data));
            });
    };
};

export const getCocktail = id => {
    return dispatch => {
        return axios.get('/cocktails/' + id).then(
            response => {
                dispatch(fetchCocktailSuccess(response.data));
                console.log(response.data);
            });
    };
};

export const getTracks = () => {
    return dispatch => {
        return axios.get('/tracks').then(
            response => {
                dispatch(fetchTracksSuccess(response.data));
            });
    };
};
export const getTracksByAlbum = albumId => {
    return dispatch => {
        return axios.get('/tracks?cocktail=' + albumId).then(
            response => {
                dispatch(fetchTracksSuccess(response.data));
                console.log(response.data);
            });
    };
};

export const createArtist = artistData => {
    return dispatch => {
        return axios.post('/cocktails', artistData).then(
            response => {
                console.log(response.data);
                dispatch(push('/'))
            },
            error => {
                if (error.response) {
                    dispatch(fetchFailure(error.response.data));
                } else {
                    dispatch(fetchFailure({global: "No network connection "}))
                }
            });
    };
};

export const createCocktail = cocktailData => {
    return dispatch => {
        return axios.post('/cocktails', cocktailData).then(
            response => {
                dispatch(push('/'));
                console.log(response.data);
            },
            error => {
                if (error.response) {
                    dispatch(fetchFailure(error.response.data));
                } else {
                    dispatch(fetchFailure({global: "No network connection "}))
                }
            });
    };
};

export const deleteCocktail = id => {
    return dispatch => {
        return axios.delete('/cocktails?id=' + id).then(
            response => {
                dispatch(fetchCocktailsSuccess(response.data));
            });
    };
};

export const toggleCocktailPublish = id => {
    return dispatch => {
        return axios.post('/cocktails/' + id + '/toggle_published').then(
            response => {
                dispatch(fetchCocktailsSuccess(response.data));
            });
    };
};

