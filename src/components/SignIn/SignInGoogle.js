import React from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { HOME } from '../../constants/routes';
import { Button, Icon } from 'semantic-ui-react';
import ErrorDisplay from '../../common_use_components/ErrorDisplay';

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an email address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFacebook extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null }
    }

    doSignInUsingGoogle = (event) => {
        const { firebase } = this.props;

        firebase.doSignInWithGoogle()
        .then(googleAuthUser => {
            // console.log('[facebookAuthUser]', facebookAuthUser);
            // alert('stop lige');
            if (googleAuthUser.additionalUserInfo.isNewUser) {
                // Create a user in your Firebase Realtime Database too
                return firebase.user(googleAuthUser.user.uid).set({
                    username: googleAuthUser.additionalUserInfo.profile.name,
                    email: googleAuthUser.additionalUserInfo.profile.email,
                    roles: [],
                });
            } else {
                return null;
            }
        })
        .then(() => {
            this.setState({ error: null })
            this.props.history.push(HOME)
        })
        .catch(error => {
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
            }
            this.setState({ error });
        })

        event.preventDefault();
    }

    render() {
        const { error } = this.state;
        return (
            <form onSubmit={this.doSignInUsingGoogle}>
                <Button color='google plus' type="submit">
                    <Icon name='google' /> Google sign in
                </Button>
                { error && <ErrorDisplay error={error}/>}
            </form>
        );
    }
}

export default compose(
    withRouter,
    withFirebase
)(SignInFacebook);