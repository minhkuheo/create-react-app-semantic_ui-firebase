import React from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Form, Header, Segment, Message } from 'semantic-ui-react';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const SignUp = () => (
    <SignUpForm />
);

export default SignUp;

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this email address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;



const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
};

class SignUpFormClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmitSigningUp = event => {
        const { username, email, passwordOne, isAdmin } = this.state;
        const { firebase } = this.props;

        const roles = [];
        if (isAdmin) {
            roles.push(ROLES.ADMIN);
        }

        firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return firebase.user(authUser.user.uid).set({ username, email, roles });
            })
            .then(() => {
                return firebase.doSendEmailVerification();
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onChangeCheckbox = () => {
        this.setState(prevState => ({ isAdmin: !prevState.isAdmin }) );
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            isAdmin,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Header as="h2" textAlign="center" color="green">Sign up</Header>

                    <Segment textAlign="center">
                        <Form onSubmit={this.onSubmitSigningUp}>
                            <Form.Input fluid
                                icon="smile outline"
                                iconPosition="left"
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Full Name"
                            />
                            <Form.Input fluid
                                icon="user"
                                iconPosition="left"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="email"
                                placeholder="Email Address"
                            />
                            <Form.Input fluid
                                icon="lock"
                                iconPosition="left"
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                            />
                            <Form.Input fluid
                                icon="lock"
                                iconPosition="left"
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Confirm Password"
                            />
                            <Form.Checkbox 
                                label="Admin: (Only for testing Admin assignation)"
                                name="isAdmin"
                                checked={isAdmin}
                                onChange={this.onChangeCheckbox}
                                disabled={true}
                            />

                            <Form.Button fluid disabled={isInvalid} color="teal">Sign Up</Form.Button>
                        </Form>
                    </Segment>

                    {
                        error &&
                        <Message>
                            <p style={{ color: '#F2552C' }}>Ups! Something is not right...</p>
                            <p style={{ color: '#F2552C' }}>{error.message}</p>
                        </Message>
                    }
                </Grid.Column>
            </Grid>
        );
    }
}

// const SignUpForm = withRouter(withFirebase(SignUpFormClass));

// Note: compose function applies the higher-order components from right to left.
const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormClass);

// export {
//     // SignUpForm, 
//     SignUpLink,
// };