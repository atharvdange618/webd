// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    sendHttpRequest: (options) => ipcRenderer.invoke('send-http-request', options),
});
