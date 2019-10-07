import axios from 'axios';
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";

const AUTHENTICATED = 'authenticated_user';
const UNAUTHENTICATED = 'unauthenticated_user';
const AUTHENTICATION_ERROR = 'authentication_error';

const API_BASE_PATH = 'https://seminars-api.herokuapp.com/';
const SIGN_IN_PATH = 'authentication/signin/';
const CURRENT_USER_PATH = 'authentication/current/';

function signInAction({email, password}, history) {
    const requestPayload = {email, password};
    return async (dispatch) => {
      try {
        const response = await axios.post(API_BASE_PATH + SIGN_IN_PATH, requestPayload);
        localStorage.setItem('token', response.data.token);

        const currentUser = await axios.get(API_BASE_PATH + CURRENT_USER_PATH, { headers: getAuthorizationBearerHeader()});
          localStorage.setItem('currentUser', JSON.stringify(currentUser.data));
          dispatch({type: AUTHENTICATED});
          history.push('/');
      } catch(error) {
          dispatch({
              type: AUTHENTICATION_ERROR,
              payload: 'Invalid email or password'
          });
      }
    };
}

export {AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR, signInAction};
