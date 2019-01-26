import React from 'react';
import { withFirebase } from '../Firebase';
import AuthUserContext from './context';

/** The goal of this HOC:
 *      checks for the session authentication
 * 
 * @param {Object} Component a React component
 */
const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                authUser: null
            };
        }

        componentDidMount() {
            const { firebase } = this.props;
            // this.listener = firebase.auth.onAuthStateChanged(authUser => {
            //     authUser
            //         ?   this.setState({ authUser: authUser, loading: false })
            //         :   this.setState({ authUser: null, loading: false });
            // });
            this.listener = firebase.onAuthUserListener(
                // parameter 1: on success call this function
                authUser => {
                    // console.log('withAuthentication onSucess');
                    this.setState({ 
                        authUser: authUser, 
                        loading: false 
                    });
                },
                // parameter 2: on fallback call this function
                () => {
                    // console.log('withAuthentication onFallback');
                    this.setState({ 
                        authUser: null,
                        loading: false
                    });
                }
            );
        }
        
        componentWillUnmount() {
            /**
             * avoid memory leaks that lead to performance issues ==> remove the listener if the component unmounts.
             */
            this.listener();
        }

        render() {
            if (this.state.loading) { return null; }
            
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }

    return withFirebase(WithAuthentication);
};

export default withAuthentication;