const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow
const path = require("path")
const url = require("url")

let win;

function createWindow() {
    win = new BrowserWindow()
    win.loadURL(url.format({
        protocol: 'file',
        pathname: path.join(__dirname, "index.html"),
        slashes: true
    }));

    // win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)
