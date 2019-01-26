import React from 'react';
import { withFirebase } from '../Firebase';
import { Grid, Form, Header } from 'semantic-ui-react';
import ErrorDisplay from '../../common_use_components/ErrorDisplay';

const PassWordForgetPage = () => (
    <div>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null
}

class PasswordForgetFormBaseClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOnSubmitPasswordForget = (event) => {
        event.preventDefault();

        const { firebase } = this.props;

        firebase.doPasswordReset(this.state.email)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
            this.setState({ error: error.message });
        });
    }

    render() {
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <Form onSubmit={this.handleOnSubmitPasswordForget}>
                <h4>Please enter your email to reset the password</h4>
                <Form.Input
                    fluid
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    placeholder="Email Address"
                    type="email"
                />
                <Form.Button fluid disabled={isInvalid} color="teal">
                    Reset My Password
                </Form.Button>

                {error && <ErrorDisplay error={error}/>}
            </Form>
            // <Grid centered columns={2}>
            //     <Grid.Column>
            //     </Grid.Column>
            // </Grid>
        )
    }
}

const PasswordForgetForm = withFirebase(PasswordForgetFormBaseClass);

export { PasswordForgetForm };
export default PassWordForgetPage;