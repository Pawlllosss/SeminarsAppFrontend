import {combineReducers} from "redux";
import authenticationReducer from './AuthenticationReducer';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
    form: formReducer,
    authentication: authenticationReducer
});

export default rootReducer;