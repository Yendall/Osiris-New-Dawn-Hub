/**
 * @file    crafting_landing.js
 * @type    Controller
 * @author  Max Yendall
 * @desc    Landing page for multiple crafting instances
 *
 */

const remote = require('electron').remote
const main = remote.require('./main.js')

// Function: initialise redirection by referencing main class
// @return:  New HTML DOM from user input
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
