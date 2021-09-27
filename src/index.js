import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './context/context';
import App from './App';
import './index.css';
import { SpeechProvider } from '@speechly/react-client';

ReactDOM.render(
    <SpeechProvider appId="6f5aa38d-2ee4-41cb-96f3-dac092c547f7" language="en-US">
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>
    , document.getElementById("root"))
