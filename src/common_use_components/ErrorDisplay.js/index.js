import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorDisplay = ({ error }) => (
    <Message>{error.message}</Message>
);

export default ErrorDisplay;
