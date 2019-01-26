import React from 'react';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';

import { Container, Menu } from 'semantic-ui-react';

import SignOutButton from '../SignOut';

// const NavigationMainMenu = ({authUser}) => (
//     <div>
//         {
//             authUser
//                 ? <NavigationAuth />
//                 : <NavigationNonAuth />
//         }
//     </div>
// );
const NavigationMainMenu = () => (
    <Menu inverted pointing secondary borderless>
        <Container>
            <Menu.Item as={Link} to={ROUTES.LANDING} header>
                <h2>hx_minh</h2>
            </Menu.Item>
            <AuthUserContext.Consumer>
                {
                    authUser =>
                        authUser
                            ?   <NavigationAuth authUser={authUser}/>
                            :   <NavigationNonAuth />
                }
            </AuthUserContext.Consumer>
        </Container>
    </Menu>
);

const NavigationAuth = ({authUser}) => (
    <React.Fragment>
        <Menu.Menu position="right">
            <Menu.Item as={Link} to={ROUTES.HOME}><h3>Home</h3></Menu.Item>
            <Menu.Item as={Link} to={ROUTES.ACCOUNT}><h3>Account</h3></Menu.Item>
            {
                authUser.roles.includes(ROLES.ADMIN) &&
                <Menu.Item as={Link} to={ROUTES.ADMIN}><h3>Admin</h3></Menu.Item>
            }
            <SignOutButton />
        </Menu.Menu>
    </React.Fragment>
);

const NavigationNonAuth = () => (
    <React.Fragment>
        <Menu.Menu position="right">
            <Menu.Item as={Link} to={ROUTES.SIGN_IN}><h3>Login</h3></Menu.Item>
        </Menu.Menu>
    </React.Fragment>
);

export default NavigationMainMenu;