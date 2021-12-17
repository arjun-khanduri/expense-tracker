import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './context/context';
import App from './App';
import './index.css';
import { SpeechProvider } from '@speechly/react-client';

ReactDOM.render(
    <SpeechProvider appId={process.env.REACT_APP_SPEECHLY_VOICE_MODEL} language="en-US">
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>
    , document.getElementById("root"))
