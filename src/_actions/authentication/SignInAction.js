import axios from 'axios';
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";
import {API_URL} from "../../config";

const AUTHENTICATED = 'authenticated_user';
const UNAUTHENTICATED = 'unauthenticated_user';
const AUTHENTICATION_ERROR = 'authentication_error';

const SIGN_IN_PATH = 'authentication/signin/';
const CURRENT_USER_PATH = 'authentication/current/';

function signInAction({email, password}, history) {
    const requestPayload = {email, password};
    return async (dispatch) => {
      try {
        const response = await axios.post(API_URL + SIGN_IN_PATH, requestPayload);
        localStorage.setItem('token', response.data.token);

        const currentUser = await axios.get(API_URL + CURRENT_USER_PATH, { headers: getAuthorizationBearerHeader()});
          localStorage.setItem('currentUser', JSON.stringify(currentUser.data));
          dispatch({
              type: AUTHENTICATED,
              nickname: currentUser.data.nickname,
              privileges: currentUser.data.privileges
          });
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
