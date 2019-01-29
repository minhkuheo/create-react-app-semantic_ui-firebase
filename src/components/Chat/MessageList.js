import React from 'react';
import { Comment } from 'semantic-ui-react';
import Moment from 'react-moment';

const myColor = {
    author: { color: 'white' },
    createAt: { color: 'grey' },
    text: { color: 'yellow' }
}

class MessageList extends React.Component {

    render() {
        const { messages } = this.props;
        return (
            <Comment.Group>
                {
                    Object.keys(messages).map(messageId => (
                        <MessageItem key={messageId} message={messages[messageId]} />
                    ))
                }
            </Comment.Group>
        );
    }
};
// const MessageList = ({ messages }) => (
//     <Comment.Group>
//         {
//             messages.map(message => (
//                 <MessageItem key={message.messageId} message={message} />
//             ))
//         }
//     </Comment.Group>
// );

const MessageItem = ({ message }) => (
    <Comment>
        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
        <Comment.Content>
            <Comment.Author as='a' style={myColor.author}>{message.username}</Comment.Author>
            <Comment.Metadata>
                <p style={myColor.createAt}><Moment fromNow>{message.createAt}</Moment></p>
                {/* <div>Today at 5:42PM</div> */}
            </Comment.Metadata>
            <Comment.Text style={myColor.text}>{message.text}</Comment.Text>
            {/* <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
            </Comment.Actions> */}
        </Comment.Content>
    </Comment>
);

export default MessageList;