const electron = require('electron');
const { Tray } = electron;

// Passing in the iconPath cos the Tray instance expects 1st arg: path to the icon image
class TimerTray extends Tray {
  // All in the constructor is run when the class is called
  // Creating extra arg so we can receive reference to the mainWindow
  constructor(iconPath, mainWindow) {
    super(iconPath);

    // Assigning it as an instance property
    this.mainWindow = mainWindow;

    // The setToolTip function is from the parent class Tray
    // Takes one arg: string: what the tooltip shows when the mouse hovers
    this.setToolTip('Timer App');

    // Want to setup so the onClick is run when the class is called
    // Getting access to all functions from the parent class Tray
    this.on('click', this.onClick);
  }

  // Can create event handlers on Tray, same as we can with BrowserWindow. After moving from index.js: instead of creating handler directly on Tray, we are setting the up the click event in the class constructor
  // event and bounds args are coming from the .on event handler
  onClick = (event, bounds) => {
    // CLICK EVENT bounds
    // The X and Y coordinates show how far left and how far down the screen is the icon (Remember Tray focuses on the icon)
    const { x, y } = bounds;

    // Getting the WINDOW BOUNDS: dimensions of the window: Width and Height
    // getBounds also works correctly if the user RESIZES the window (if you allow the user to resize the window manually with the arrows)
    const { width, height } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height; // NOTE: OSX: y because height === y. Windows: y - height: click event bounds (y) - height of the window (height)

      // setBounds() DYNAMICALLY set the width and height of the window
      // setBounds can also set the positioning on the screen
      this.mainWindow.setBounds({
        x: x - width / 2, // How far from the left of the screen: measured from the app's left hand top corner: to position it HORIZONTALLY
        y: yPosition, // How far is the app measured from top of the screen to the icon: from the app's left hand top corner: to position it VERTICALLY
        height, // Height is high TALL we want the window to be | keeping the width as it currently is
        width, // Width is high WIDE we want the window to be | keeping the width as it currently is
      });
      this.mainWindow.show();
    }
  };
}

module.exports = TimerTray;
