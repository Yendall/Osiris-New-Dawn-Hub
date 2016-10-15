const remote = require('electron').remote
const main = remote.require('./main.js')

$( () => {
    // Display some statistics about this computer, using node's os module.
    var os = require('os');
    var prettyBytes = require('pretty-bytes');

    $('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span>');
    $('.stats').append('Free memory: <span>' + prettyBytes(os.freemem())+ '</span>');

    // Electron's UI library. We will need it for later.
    var shell = require('shell');
    var categories = ['Inventory','Map','Building'];

    $('#building').click(() => {
      main.openCrafting();
    })
});
