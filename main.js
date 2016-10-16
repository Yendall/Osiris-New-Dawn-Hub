const electron = require('electron')
const {app,BrowserWindow} = electron;
const fs = require('fs');
// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Set global model
global.craftables = JSON.parse(
  fs.readFileSync(__dirname + '/model/assets/json/craftables.json','utf-8'));
global.structures = JSON.parse(
  fs.readFileSync(__dirname + '/model/assets/json/structures.json','utf-8'));
global.vehicles = JSON.parse(
  fs.readFileSync(__dirname + '/model/assets/json/vehicles.json','utf-8'));
global.craftingType = "None";

var win = null;
// Called when Electron has finished
// initialization and is ready to create all windows
app.on('ready', () => {
  // Create the index window
  win = new BrowserWindow({width: 1000, height: 625});
  // Load the index.html of the app.
  win.loadURL(`file://${__dirname}/view/index.html`);
});

// Setter for crafting type
exports.setCraftingType = (type) => {
  global.craftingType = type;
}

// Crafting interface
exports.openCrafting = () => {
  // Load the crafting_landing.html of the app
  win.loadURL(`file://${__dirname}/view/crafting_landing.html`);
}

// Individual Crafting interface
exports.openCraftingIndv = () => {
  // Load the crafting_individual.html of the app
  win.loadURL(`file://${__dirname}/view/crafting.html`);
}

// Inventory interface
exports.openInventory = () => {
  // Load the inventory.html of the app
  win.loadURL(`file://${__dirname}/view/inventory.html`);
}

// Map interface
exports.openMap = () => {
  // Load the map.html of the app
  win.loadURL(`file://${__dirname}/view/map.html`);
}
