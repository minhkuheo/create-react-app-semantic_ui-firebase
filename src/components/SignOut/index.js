import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { Menu } from 'semantic-ui-react';

const SignOutButton = ({firebase}) => (
    <Menu.Item as={Link} to="" onClick={firebase.doSignOut}><h3>Sign Out</h3></Menu.Item>
);

export default withFirebase(SignOutButton);