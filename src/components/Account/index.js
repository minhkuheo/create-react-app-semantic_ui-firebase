import React from 'react';
import { compose } from 'recompose';
import PasswordChangeForm from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import SignInMethodsManagerment from './SignInMethodsManagerment';

import { Grid, Header } from 'semantic-ui-react';

class AccountPage extends React.Component {
    render() {
        return (
            <AuthUserContext.Consumer>
                {
                    authUser => (
                        <Grid>
                            <Header as="h1"
                                content={`Hi there, ${authUser.email}`}
                                subheader='Note: The authorization for now is set on broad-grained !!!'
                                inverted
                            />
                            {/* <Grid.Row>
                            </Grid.Row>
                            <br /> */}
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <PasswordChangeForm />
                                </Grid.Column>
                                <Grid.Column>
                                    <PasswordForgetForm />
                                </Grid.Column>
                            </Grid.Row>
                            
                            <SignInMethodsManagerment authUser={authUser}/>
                        </Grid>
                    )
                }
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(AccountPage);