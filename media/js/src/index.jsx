import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import 'bootstrap';
import { App } from './app';

const container = document.getElementById('react-root');
const root = ReactDOMClient.createRoot(container);

root.render(
    <App />
);