const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  // Not passing options since The BrowserWindow is hardcoded: do not want to change settings
  // Instead we are setting the object from the original BrowserWindow in the index.js file. NOT a good idea if want to later create variants of MainWindow: rather then to pass options
  // Remember the super() function just passes the data to the parent class i.e. BrowserWindow
  constructor() {
    super({
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: __dirname + '/preload.js',
      },
      width: 300,
      height: 500,
      // The frame property controls showing the status bar or not. False states to not show
      frame: false,
      // resizable property controls whether you can resize the window horizontally or vertically
      resizable: false,
      show: false,
      skipTaskbar: true,
    });

    this.on('blur', this.onBlurWindow);
  }

  onBlurWindow = () => {
    // This is = the mainWindow so we can directly call hide on using the 'this' keyword
    this.hide();
  };
}

module.exports = MainWindow;
