/**
 * @file    index.js
 * @type    Controller
 * @author  Max Yendall
 * @desc    Controls element behaviour when clicked on the main landing page
 *
 */

const remote = require('electron').remote
const main = remote.require('./main.js')

// Function: initialise redirection by referencing main class
// @return:  New HTML DOM from user input
$(() => {
    $('#building').click(() => {
      main.openCrafting();
    })
    $('#map').click(() => {
      main.openMap();
    })
    $('#serverinfo').click(() => {
      main.openServerInformation();
    })
});
