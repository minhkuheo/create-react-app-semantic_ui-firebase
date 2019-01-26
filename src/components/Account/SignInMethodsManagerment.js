import React from 'react';
import { withFirebase } from '../Firebase';
import { Button, Icon, Grid, Form, Header } from 'semantic-ui-react';
import ErrorDisplay from '../../common_use_components/ErrorDisplay.js';

const SIGN_IN_METHODS = [
    {
        id: 'password',
        provider: null,
    },
    {
        id: 'facebook.com',
        provider: 'facebookProvider',
    },
    // {
    //     id: 'google.com',
    //     provider: 'googleProvider',
    // },
    // {
    //     id: 'twitter.com',
    //     provider: 'twitterProvider',
    // },
    // {
    //     id: 'github.com',
    //     provider: 'githubProvider'
    // },
];

class SignInMethodsManagerment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSignInMethods: [],
            error: null
        };
    }

    componentDidMount() {
        this.fetchSignInMethods();
    }

    fetchSignInMethods = () => {
        const { firebase, authUser } = this.props;
        firebase.auth.fetchSignInMethodsForEmail(authUser.email)
            .then(activeSignInMethods => {
                // This returns the same array as fetchProvidersForEmail but for email
                // provider identified by 'password' string, signInMethods would contain 2
                // different strings:
                // 'emailLink' if the user previously signed in with an email/link
                // 'password' if the user has a password.
                // A user could have both.

                //Link: https://firebase.google.com/docs/auth/web/email-link-auth
                this.setState({
                    activeSignInMethods: activeSignInMethods,
                    error: null
                });
            })
            .catch(error => {
                this.setState({ error });
            })
    };

    // Linking/re-authentication with email link
    // https://firebase.google.com/docs/auth/web/email-link-auth
    // https://firebase.google.com/docs/auth/web/account-linking
    onDefaultLoginLink = (password) => {
        const { firebase, authUser } = this.props;
        // console.log('[firebase]', firebase);
        // console.log('[authUser.email]', authUser.email);
        // const credential = firebase.emailAuthProvider.credentialWithLink(authUser.email, password);
        const credential = firebase.emailAuthProvider.credential(authUser.email, password);
        // console.log('[credential]',credential);

        firebase.auth.currentUser.linkAndRetrieveDataWithCredential(credential)
        .then(this.fetchSignInMethods)
        .catch(error => this.setState({ error }));
    }

    // https://firebase.google.com/docs/auth/web/account-linking
    onClickLinkSocialAccount = provider => () => {
        const { firebase } = this.props;
        // console.log('[provider]',provider);
        // console.log('[firebase.auth.currentUser]',firebase.auth.currentUser); 
        // console.log(firebase);
        // console.log(firebase.auth);
        // console.log(firebase[provider]);
        firebase.auth.currentUser.linkWithPopup(firebase[provider])
        .then(() => this.fetchSignInMethods)
        .catch(error => this.setState({error}));
    }

    // https://firebase.google.com/docs/auth/web/account-linking
    onClickDeactivate = providerId => () => {
        const { firebase } = this.props;
        // console.log('[providerId]',providerId);
        // console.log('[firebase.auth.currentUser]',firebase.auth.currentUser); 
        firebase.auth.currentUser.unlink(providerId)
        .then(() => this.fetchSignInMethods)
        .catch(error => this.setState({error}));
    }

    render() {
        const { activeSignInMethods, error } = this.state;
        return (
            <React.Fragment>
                <Header as="h1"
                    content='Sign in methods'
                    subheader='If you use 1 email address for 3 sign in methods, you can link them together here'
                    inverted
                    dividing
                />
                <Grid.Row>
                    {
                        SIGN_IN_METHODS.map(thisSignInMethodObject => {
                            const isEnabled = activeSignInMethods.includes(thisSignInMethodObject.id);
                            const onlyOneLeft = activeSignInMethods.length === 1;

                            return (
                                <div key={thisSignInMethodObject.id}>
                                    {
                                        thisSignInMethodObject.id === 'password'
                                            ?
                                                <DefaultLoginToggle
                                                    onlyOneLeft={onlyOneLeft}
                                                    isEnabled={isEnabled}
                                                    thisSignInMethodObject={thisSignInMethodObject}
                                                    onClickLink={this.onDefaultLoginLink}
                                                    onClickDeactivate={this.onClickDeactivate}
                                                />
                                            :
                                                <SocialLoginToggle
                                                    onlyOneLeft={onlyOneLeft}
                                                    isEnabled={isEnabled}
                                                    thisSignInMethodObject={thisSignInMethodObject}
                                                    onClickLink={this.onClickLinkSocialAccount}
                                                    onClickDeactivate={this.onClickDeactivate}
                                                />
                                    }
                                </div>
                            );
                        })
                    }
                </Grid.Row>

                { error && <ErrorDisplay error={error} /> }
            </React.Fragment>
        );
    }
}

class DefaultLoginToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordOne: '',
            passwordTwo: ''
        };
    }

    onChangeInputForm = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.props.onClickLink(this.state.passwordOne);
        this.setState({ passwordOne: '', passwordTwo: '' });
    }

    render() {
        const {
            onlyOneLeft,
            isEnabled,
            thisSignInMethodObject,
            onClickDeactivate,
        } = this.props;

        const { passwordOne, passwordTwo } = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

        return (
            isEnabled
                ?
                    (
                        <Button disabled={onlyOneLeft}
                            onClick={onClickDeactivate(thisSignInMethodObject.id)} 
                        >
                            Deactivate {thisSignInMethodObject.id}
                        </Button>
                    )
                :
                    (
                        <Form onSubmit={this.onSubmit}>
                            <Form.Input
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChangeInputForm}
                                type="password"
                                placeholder="New Password"
                            />
                            <Form.Input
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={this.onChangeInputForm}
                                type="password"
                                placeholder="Confirm New Password"
                            />

                            <Form.Button disabled={isInvalid}>
                                Link {thisSignInMethodObject.id}
                            </Form.Button>
                        </Form>
                    )
        );
    }
}

const SocialLoginToggle = ({ onlyOneLeft, isEnabled, thisSignInMethodObject, onClickLink, onClickDeactivate }) => 
    isEnabled
        ?
            (
                <Button disabled={onlyOneLeft} color='facebook'
                    onClick={onClickDeactivate(thisSignInMethodObject.id)} 
                >
                    Deactivate <Icon name='facebook' /> {thisSignInMethodObject.id}
                </Button>
            )
        :
            (
                <Button color='facebook'
                    onClick={onClickLink(thisSignInMethodObject.provider)}
                >
                    Link <Icon name='facebook' /> {thisSignInMethodObject.id}
                </Button>
            );

export default withFirebase(SignInMethodsManagerment);