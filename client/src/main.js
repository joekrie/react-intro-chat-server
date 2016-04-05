import React from 'react';
import {render} from 'react-dom';
import ChatClient from './ChatClient.js';

render(
    <ChatClient serverBaseUrl='http://reactintrochatserver-60954.onmodulus.net' />, 
    document.getElementById('app')
);