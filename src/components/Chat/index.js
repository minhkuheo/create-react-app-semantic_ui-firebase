import React from 'react';
import {
    Form,
    Button,
    Header
} from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import MessageList from './MessageList';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null,
            messageText: '',
            totalLoadedMessages: 0,
            limit: 5,
        };
    }

    componentDidMount() {
        this.onListenForMessages();
    }

    onListenForMessages = () => {
        const { firebase } = this.props;

        firebase.messages().limitToLast(this.state.limit).on('child_added', async snapShot => {
            const messageKey = snapShot.key;
            const messageObj = snapShot.val();

            const { uid } = messageObj;

            const usernameSnapshot = await firebase.user(uid).child('username').once('value');
            const username = usernameSnapshot.val();

            const message = {
                ...messageObj,
                messageId: messageKey,
                username: username
            };

            if (this.state.messages) {
                this.setState(prevState => {
                    const inc = prevState.messages[messageKey] ? 0 : 1;
                    
                    prevState.messages[messageKey] = message;
                    return {
                        messages: prevState.messages,
                        totalLoadedMessages: prevState.totalLoadedMessages + inc
                    }
                });
            } else {
                const mesObj = {[messageKey]: message};
                this.setState({ 
                    messages: {...mesObj}, 
                    totalLoadedMessages: this.state.totalLoadedMessages + 1
                });
            }
        });
    }

    componentWillUnmount() {
        this.props.firebase.messages().off();
    }

    onMessageSendingSubmit = (authUser) => (event) => {
        event.preventDefault();

        if (this.state.messageText) {
            const { firebase } = this.props;
            firebase.messages().push({
                text: this.state.messageText,
                uid: authUser.uid,
                createAt: firebase.serverValue.TIMESTAMP
            });
    
            this.setState({
                messageText: '',
            });
        }
    }

    onMessageTyping = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    loadingMore = () => {
        const newLimit = this.state.limit + 5;
        this.setState(
            { limit: newLimit }, 
            () => this.onListenForMessages()
        );
    }

    render() {
        const { messages, messageText, totalLoadedMessages, limit } = this.state;
        const canLoadMore = totalLoadedMessages === limit;
        return (
            <AuthUserContext.Consumer>
                {
                    authUser => (
                        <div>
                            <h1>Chat room for all registered users</h1>


                            {
                                messages
                                    ? <MessageList messages={messages} />
                                    : <div>There is no message yet ...</div>
                            }

                            {
                                messages && canLoadMore &&
                                <Header
                                    as="h5"
                                    textAlign='center'
                                    color="green"
                                    style={{ cursor: 'pointer' }}
                                    onClick={this.loadingMore}
                                >
                                    Load more ...
                                </Header>
                            }

                            <Form onSubmit={this.onMessageSendingSubmit(authUser)}>
                                <Form.Input
                                    fluid
                                    name="messageText"
                                    value={messageText}
                                    onChange={this.onMessageTyping}
                                    placeholder="Type a message ..."
                                />
                                <Form.Button color="teal" size="big" disabled={!messageText}>Send</Form.Button>
                            </Form>
                        </div>
                    )
                }
            </AuthUserContext.Consumer>
        );
    }
}

export default withFirebase(Messages);