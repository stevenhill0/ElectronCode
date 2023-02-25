const path = require('path'); // path is the default helper from Node js: it's called the path module: it generates paths regardless what operating system user is on
const electron = require('electron');
const { app, ipcMain } = electron;

const TimerTray = require('./app/timerTray');
const MainWindow = require('./app/mainWindow');

// Floating reference to the mainWindow
let mainWindow;
let tray;

app.on('ready', () => {
  // app.dock.hide();

  mainWindow = new MainWindow();

  // URL for the BrowserWindow to look at
  mainWindow.loadURL(`File://${__dirname}/src/index.html`);

  // blur event is when whenever the user clicks away from the app i.e. clicks anywhere else besides the app
  // Only use it if building an app that sits in the system tray. Don't use it for a traditional desktop app
  mainWindow.on('blur', () => {
    mainWindow.hide();
  });
  // NOTE: you do NOT need to state @2x modifier at the end of 'windows-icon' because electron will choose whether you need the high res version or not
  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  // The join function in the path library joins two paths and makes sure they work on any operating system
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  // TimerTray custom class takes two args: original Tray icon path, and mainWindow (so functions in TimerTray have access to it)
  // Keeping the tray variable as a reference so that TimerTray does not get garbage collected (deletes in memory) by JS
  tray = new TimerTray(iconPath, mainWindow);

  // To get the message to show in the status bar we can use the tray object
  ipcMain.on('update-timer', (event, timeLeft) => {
    // setTitle is a built in function
    tray.setTitle(timeLeft);
  });
});
