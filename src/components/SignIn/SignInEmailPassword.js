import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

import { Form } from 'semantic-ui-react';

import { HOME } from '../../constants/routes';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;
        const { firebase } = this.props;

        firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <Form size="large" onSubmit={this.onSubmit}>
                <Form.Input fluid 
                    icon="user" 
                    iconPosition="left" 
                    placeholder="Email address" 
                    name="email" 
                    value={email} 
                    onChange={this.onChange}
                />
                <Form.Input fluid 
                    icon="lock" 
                    iconPosition="left" 
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                />
                <Form.Button fluid color="teal" disabled={isInvalid}>Login</Form.Button>

                {error && <p style={{color: 'teal'}}>{error.message}</p>}
            </Form>
        )
    }
}

export default compose(
    withRouter,
    withFirebase
)(SignInFormClass);