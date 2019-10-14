import {AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR} from '../_actions/authentication/SignInAction'

//TODO: use Immutable.Js for actions

function authenticationReducer(state = {}, action) {
    switch(action.type) {
        case AUTHENTICATED:
            return {...state, authenticated: true, nickname: action.nickname, privileges: action.privileges};
        case UNAUTHENTICATED:
            return {...state, authenticated: false};
        case AUTHENTICATION_ERROR:
            return {...state, error: action.payload};
    }

    return state;
}

export default authenticationReducer;