import axios from 'axios';

const AUTHENTICATED = 'authenticated_user';
const UNAUTHENTICATED = 'unauthenticated_user';
const AUTHENTICATION_ERROR = 'authentication_error';

const API_BASE_PATH = 'https://seminars-api.herokuapp.com/';
const SIGN_IN_PATH = 'authentication/signin/';

function signInAction({email, password}, history) {
    const requestPayload = {email, password};
    return async (dispatch) => {
      try {
        const response = await axios.post(API_BASE_PATH + SIGN_IN_PATH, requestPayload);

        dispatch({type: AUTHENTICATED});
        localStorage.setItem('token', response.data.token);
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
