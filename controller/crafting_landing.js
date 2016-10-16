const remote = require('electron').remote
const main = remote.require('./main.js')

$(() => {
    $('#vehicles').click(() => {
      main.setCraftingType('vehicles');
      main.openCraftingIndv();
    })

    $('#structures').click(() => {
      main.setCraftingType('structures');
      main.openCraftingIndv();
    })

    $('#craftables').click(() => {
      main.setCraftingType('craftables');
      main.openCraftingIndv();
    })
});
