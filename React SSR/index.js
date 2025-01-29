require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
});

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App'

const app = express();

app.get('/', (req, res) => {
    const html = ReactDOMServer.renderToString(<App />);
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>React SSR</title>
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <div id="root">${html}</div>
            </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
