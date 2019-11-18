import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import reduxThunk from 'redux-thunk';
import {AUTHENTICATED, UNAUTHENTICATED} from "./_actions/authentication/SignInAction";
import rootReducer from "./_reducers/RootReducer";
import App from './App';
import Navbar from "./components/Navbar";
import * as serviceWorker from './serviceWorker';
import './index.css';

import CoursesView from "./components/course/CoursesView";
import SignOut from "./components/authentication/SignOut";
import SignInForm from "./components/authentication/SignInForm";
import SignUpForm from "./components/authentication/SignUpForm";
import SeminarsAdminView from "./components/seminar/admin/SeminarsAdminView";
import UsersView from "./components/user/UsersView";
import forAuthenticated from "./components/protection/ForAuthenticated";
import forNotAuthenticated from "./components/protection/ForNotAuthenticated";
import forPrivileged from "./components/protection/ForPrivileged";
import retrieveToken from "./utils/authentication/TokenRetriever";
import retrieveCurrentUser from "./utils/authentication/CurrentUserRetriever";
import {
    CRUD_ALL_SEMINARS_PRIVILEGE,
    SEMINAR_ADMIN_COMPONENT_PATH,
    SEMINAR_USER_COMPONENT_PATH
} from "./components/seminar/SeminarConstants";
import SeminarsUserView from "./components/seminar/user/SeminarsUserView";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const token = retrieveToken();
const currentUser = retrieveCurrentUser();

if(token && currentUser) {
    store.dispatch({
        type: AUTHENTICATED,
        nickname: currentUser.nickname,
        privileges: currentUser.privileges
    });
} else {
    store.dispatch({
        type: UNAUTHENTICATED
    });
}

const routing = (
    <Provider store={store}>
        <Router>
            <Navbar/>
            <Route exact path='/' component={App} />
            <Route path='/signin' component={forNotAuthenticated(SignInForm)} />
            <Route path='/signup' component={forNotAuthenticated(SignUpForm)} />
            <Route path='/courses' component={CoursesView} />
            <Route path={SEMINAR_USER_COMPONENT_PATH} component={forAuthenticated(SeminarsUserView)} />
            <Route path={SEMINAR_ADMIN_COMPONENT_PATH} component={forPrivileged(SeminarsAdminView, CRUD_ALL_SEMINARS_PRIVILEGE)} />
            <Route path='/users' component={forPrivileged(UsersView, 'CRUD_ALL_USERS')} />
            <Route path='/signout' component={forAuthenticated(SignOut)} />
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
