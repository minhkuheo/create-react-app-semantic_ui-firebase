import React from 'react';
import { withFirebase } from '../Firebase';
import { Form } from 'semantic-ui-react';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null
}

class PasswordChangeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOnSubmitChangingPassword = (event) => {
        const { passwordOne } = this.state;
        const { firebase } = this.props;

        firebase.doPasswordUpdate(passwordOne)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
            this.setState({ error });
        });

        event.preventDefault();
    }

    render() {
        const { passwordOne, passwordTwo, error } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';

        return (
            <Form onSubmit={this.handleOnSubmitChangingPassword}>
                <h4>Please enter the new password</h4>
                <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    placeholder="New Password"
                    type="password"
                />
                <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    placeholder="Confirm New Password"
                    type="password"
                />
                <Form.Button fluid disabled={isInvalid} color="teal">
                    Change my password
                </Form.Button>

                {error && <p>{error.message}</p>}
            </Form>
        )
    }
}

export default withFirebase(PasswordChangeForm);