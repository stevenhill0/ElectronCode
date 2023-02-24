const path = require('path'); // path is the default helper from Node js: its called the path module: it generates paths regardless what operating system user is on
const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;

const TimerTray = require('./app/timerTray');

// Floating reference to the mainWindow
let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, contextIsolation: false },
    width: 300,
    height: 500,
    // The frame property controls showing the status bar or not. False states to not show
    frame: false,
    // resizable property controls whether you can resize the window horizontally or vertically
    resizable: false,
    show: false,
  });

  // URL for the BrowserWindow to look at
  mainWindow.loadURL(`File://${__dirname}/src/index.html`);

  // NOTE: you do NOT need to state @2x modifier at the end of 'windows-icon' because electron will choose whether you need the high res version or not
  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  // The join function in the path library joins two paths and makes sure they work on any operating system
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  // TimerTray custom class takes two args: original Tray icon path, and mainWindow (so functions in TimerTray have access to it)
  // Keeping the tray variable as a reference so that TimerTray does not get garbage collected (deletes in memory) by JS
  tray = new TimerTray(iconPath, mainWindow);
});
