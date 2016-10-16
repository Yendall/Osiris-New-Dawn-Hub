const remote = require('electron').remote
const main = remote.require('./main.js')

$( () => {

    $('#building').click(() => {
      main.openCrafting();
    })
});
