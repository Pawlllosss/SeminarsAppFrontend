import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import reduxThunk from 'redux-thunk';
import {AUTHENTICATED} from "./_actions/authentication/SignInAction";
import rootReducer from "./_reducers/RootReducer";
import App from './App';
import AvailableCourses from "./course/AvailableCourses";
import * as serviceWorker from './serviceWorker';

import Navbar from "./Navbar";
import './index.css';
import SignOut from "./authentication/SignOut";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
//TODO: import reducers
const store = createStoreWithMiddleware(rootReducer);

const user = localStorage.getItem('token');

if(user) {
    store.dispatch({type: AUTHENTICATED});
}

const routing = (
    <Provider store={store}>
        <Router>
            <div>
                <Navbar/>
                <Route exact path='/' component={App} />
                <Route path='/courses' component={AvailableCourses} />
                <Route path='/signout' component={SignOut} />
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
