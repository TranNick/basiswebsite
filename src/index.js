import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";
import thunk from 'redux-thunk';
import createHistory from "history/createBrowserHistory";
import firebase from "firebase/app";
import 'bootstrap/dist/css/bootstrap.min.css';

import * as pages from './pages/index';
import rootReducer from './reducers/rootReducer';
import Application from './components/Application';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
    combineReducers({
      ...rootReducer,
      router: routerReducer
    }),
    applyMiddleware(middleware, thunk)
  );

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDw7XuZaDI9Y9F7kyhFFfRMjcmTpa8FvFc",
    authDomain: "website-firebase-id.firebaseapp.com",
    databaseURL: "https://website-firebase-id.firebaseio.com",
    projectId: "website-firebase-id",
    storageBucket: "website-firebase-id.appspot.com",
    messagingSenderId: "484914867670"
};
firebase.initializeApp(config);

ReactDOM.render(
    <Provider store={store}> 
        <ConnectedRouter history={history}>
            <div>
                <Route component={Application}/>
                <Switch>
                    <Route exact path='/' component={pages.App}/>
                    <Route path='/homepage' component={pages.Homepage}/>
                    <Route path='/register' component={pages.Register}/>
                    <Route path='/profile' component={pages.Profile}/>
                    <Route path='/account' component={pages.Account}/>
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
