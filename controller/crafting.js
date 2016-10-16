const remote = require('electron').remote;
const main = remote.require('./main.js');

var craftables = remote.getGlobal('craftables');
var structures = remote.getGlobal('structures');
var keys = ["Chemistry Table","Forge","Fabricator"];

for(var i=0; i<keys.length; i++) {
  for(var j=0; j<craftables['craftables'][keys[i]].length; j++)
  {
    console.log(craftables['craftables'][keys[i]][j].name);
  }
}
