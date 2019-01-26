import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import Firebase, { FirebaseContext } from './components/Firebase';

// create the Firebase instance with the Firebase class and pass it as value prop to the React’s Context
// Doing it this way, we can be assured that Firebase is only instantiated once and that it is injected via React’s Context API to React’s component tree
// Now, every component that is interested in using Firebase has access to the Firebase instance with a FirebaseContext.Consumer component

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </FirebaseContext.Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
