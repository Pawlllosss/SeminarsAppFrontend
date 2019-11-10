import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import reduxThunk from 'redux-thunk';
import {AUTHENTICATED} from "./_actions/authentication/SignInAction";
import rootReducer from "./_reducers/RootReducer";
import App from './App';
import CoursesView from "./components/course/CoursesView";
import Navbar from "./components/Navbar";
import * as serviceWorker from './serviceWorker';
import './index.css';

import SignOut from "./components/authentication/SignOut";
import SignInForm from "./components/authentication/SignInForm";
import SignUpForm from "./components/authentication/SignUpForm";
import UsersView from "./components/user/UsersView";
import forAuthenticated from "./components/protection/ForAuthenticated";
import forNotAuthenticated from "./components/protection/ForNotAuthenticated";
import forPrivileged from "./components/protection/ForPrivileged";
import retrieveToken from "./utils/authentication/TokenRetriever";
import retrieveCurrentUser from "./utils/authentication/CurrentUserRetriever";

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
}

const routing = (
    <Provider store={store}>
        <Router>
            <Navbar/>
            <Route exact path='/' component={App} />
            <Route path='/signin' component={forNotAuthenticated(SignInForm)} />
            <Route path='/signup' component={forNotAuthenticated(SignUpForm)} />
            <Route path='/courses' component={CoursesView} />
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
