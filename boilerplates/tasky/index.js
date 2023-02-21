const electron = require('electron');
const { app, BrowserWindow } = electron;

// Floating reference to the mainWindow
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });

  mainWindow.loadURL(`File://${__dirname}/src/index.html`);
});
