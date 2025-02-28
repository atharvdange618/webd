// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('send-http-request', async (event, { url, method, headers, data }) => {
    try {
        // Just make sure headers/data are passed as you expect.
        const response = await axios({
            url,
            method,
            headers,
            data,
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        return {
            error: error.message,
            status: error.response ? error.response.status : 500
        };
    }
});
