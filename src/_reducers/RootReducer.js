import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form';
import authenticationReducer from './AuthenticationReducer';
import signUpReducer from "./SignUpReducer";


const rootReducer = combineReducers({
    form: formReducer,
    authentication: authenticationReducer,
    signUp: signUpReducer
});

export default rootReducer;