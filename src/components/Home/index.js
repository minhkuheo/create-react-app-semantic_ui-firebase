import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';

import Messages from '../Chat';

class HomePage extends React.Component {
    
    render() {
        return (
            <div>
                <h2>This is the home page</h2>
                <p>Only registered and verified user may access this page</p>

                <Messages />
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(HomePage);