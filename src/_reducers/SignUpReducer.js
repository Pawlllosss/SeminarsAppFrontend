import {SIGNUP_SUCCESS, SIGNUP_ERROR} from '../_actions/authentication/SignUpAction'

//TODO: use Immutable.Js for actions

function signUpReducer(state = {}, action) {
    switch(action.type) {
        case SIGNUP_SUCCESS:
            return {...state, signup: true};
        case SIGNUP_ERROR:
            return {...state, signup: false, error: action.message};
    }

    return state;
}

export default signUpReducer;