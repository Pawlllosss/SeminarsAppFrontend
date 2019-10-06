import axios from 'axios';
import {API_URL} from "../../config";

const SIGNUP_SUCCESS = 'signup_success';
const SIGNUP_ERROR = 'signup_error';

const SIGN_UP_PATH = 'user';

function signUpAction(userInformation, history) {
    const {email, password, nickname, firstName, lastName} = userInformation;
    const requestPayload = {email, password, nickname, firstName, lastName};

    return dispatch => {
        axios.post(API_URL + SIGN_UP_PATH, requestPayload)
            .then(() => {
                dispatch({type: SIGNUP_SUCCESS});
                history.push('/');
            })
            .catch(error => dispatch({
                type: SIGNUP_ERROR,
                message: error.response.data.message
            }));
    }
}

export {SIGNUP_SUCCESS, SIGNUP_ERROR, signUpAction};
