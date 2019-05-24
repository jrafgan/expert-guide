import {push} from 'connected-react-router';
import axios from '../../axios-api';
import {NotificationManager} from "react-notifications"

export const REGISTER_USER_SUCCESS = 'REGISTER_USER _SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER _FAILURE';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';

const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});
const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const facebookLogin = userData => {
    return dispatch =>{
        return axios.post('/users/facebookLogin', userData).then(
            response=>{
                dispatch(loginUserSuccess(response.data.user));
                NotificationManager.success('Logged in successfully !');
                dispatch(push('/'));
            },
            ()=>{dispatch(loginUserFailure('Login via Facebook failed'))}
        )
    }
};

export const logoutUser = () => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.delete('/users/sessions', config).then(() => {dispatch({type: LOGOUT_USER});
                NotificationManager.success('Logged out !');
            },
            error => {
                if (error.response) {
                    dispatch(registerUserFailure(error.response.data));
                    NotificationManager.error('Could not logout !');
                } else {
                    dispatch(registerUserFailure({global: "No network connection "}))
                }
            }

        )
    }
};