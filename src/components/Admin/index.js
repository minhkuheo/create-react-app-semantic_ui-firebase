import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: {}
        }
    }

    componentDidMount() {
        const { firebase } = this.props;
        firebase.users().on('value', snapShot => {
            const userDataObjects = snapShot.val();
            
            this.setState({
                loading: false,
                users: userDataObjects || {}
            });
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount admin');
        this.props.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;
        return (
            <div>
                <h2>This is Admin Homepage</h2>
                <p>Only admin alone can access this page.</p>
                <p>This page shows the list of all registered users in this system</p>
                <br />
                {
                    loading
                        ?   <div>Loading ...</div>
                        :   <UserList users={users}/>
                }
            </div>
        )
    }
}

const UserList = ({ users }) => (
    <ul>
        {
            Object.keys(users).map(userId => {
                return (
                    <li key={userId}>
                        <span>
                            <strong>{users[userId].username}</strong> - {users[userId].email}
                        </span>
                    </li>
                );
            })
        }
    </ul>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(withFirebase, withAuthorization(condition))(AdminPage);