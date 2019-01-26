import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Grid,
    Header,
    Segment, 
} from 'semantic-ui-react';

import { SIGN_UP, PASSWORD_FORGET } from '../../constants/routes';

// import { PasswordForgetLink } from '../PasswordForget';

import SignInEmailPassword from './SignInEmailPassword'
import SignInFacebook from './SignInFacebook';
// import SignInGoogle from './SignInGoogle';

const SignIn = () => (
    <Grid centered columns={2}>
        <Grid.Column>
            <Header as="h2" textAlign="center" color="green">
                Login
            </Header>
            
            <Segment>
                <SignInEmailPassword />
                <Header as="h4" textAlign="right">
                    <Link to={PASSWORD_FORGET}>Forgot password ?</Link>
                </Header>
                <Header as="h4" textAlign="right">
                    <p>Don't have an account? <Link to={SIGN_UP}>Sign Up</Link></p>
                </Header>
            </Segment>

            <Segment textAlign="center">
                <Header as="h3">Sign in with social account</Header>
                <SignInFacebook />
                <br />
                {/* <SignInGoogle /> */}
            </Segment>
            
        </Grid.Column>

    </Grid>
);

export default SignIn;

// export { SignInForm };