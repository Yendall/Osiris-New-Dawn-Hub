const electron = require('electron')
const {app,fs,BrowserWindow} = electron

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

var win = null;
// Called when Electron has finished
// initialization and is ready to create all windows
app.on('ready', () => {
  // Create the index window
  win = new BrowserWindow({width: 1000, height: 625});
  // Load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`);
});

// Crafting interface
exports.openCrafting = () => {
  // Load the crafting.html of the app
  win.loadURL(`file://${__dirname}/crafting.html`);
}

// Inventory interface
exports.openInventory = () => {
  // Load the inventory.html of the app
  win.loadURL(`file://${__dirname}/inventory.html`);
}
