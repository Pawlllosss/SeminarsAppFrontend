import {UNAUTHENTICATED} from "./SignInAction";

function signOutAction() {
    localStorage.clear();

    return dispatch => dispatch({type: UNAUTHENTICATED});
}

export default signOutAction;