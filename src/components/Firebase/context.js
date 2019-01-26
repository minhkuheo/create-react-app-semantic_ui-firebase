// use React’s Context API to provide a Firebase instance once at the top-level of the component hierarchy
import React from 'react';

const FirebaseContext = React.createContext(null);

// HOC 
// because of the default value from the provider is an instance of firebase, 
//      aka. value={new Firebase()} 
// the default value inside the Comsumer is then that instance of firebase, 
//      aka. {firebase => render something base on this instance }
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;