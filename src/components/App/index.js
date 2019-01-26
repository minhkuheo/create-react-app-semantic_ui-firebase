import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withAuthentication } from '../Session';

import { Container } from 'semantic-ui-react';

import Navigation from '../Navigation';
import * as ROUTES from '../../constants/routes';

import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

const App = () => (
    <div>
        <Navigation />
        
        <Container>
            <Switch>
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                <Route path={ROUTES.HOME} component={HomePage} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} />
            </Switch>
        </Container>
    </div>
);
export default withAuthentication(App);