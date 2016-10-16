const remote = require('electron').remote;
const main = remote.require('./main.js');
// Fetch type of crafting
var type = remote.getGlobal('craftingType');
// Set image path
var icon_path = '../model/assets/icons/';
// Determine keys and model to populate list
switch(type)
{
  case 'vehicles':
    var keys = ["vehicles"];
    var model = remote.getGlobal('vehicles');
    break;
  case 'structures':
    var keys = ["structures"];
    var model = remote.getGlobal('structures');
    break;
  case 'craftables':
    var keys = ["chemistry table","forge","fabricator"];
    var model = remote.getGlobal('craftables');
    break;
}
// Grab DOM
var tbody = document.getElementById("table_body");
console.log(tbody);
// Craftables uses a different structure, so differentiate
if(type == 'craftables')
{
  for(var i=0; i<keys.length; i++) {
    for(var j=0; j<model[type][keys[i]].length; j++)
    {
      // Set TR and TD elements
      var tr = document.createElement('tr');
      var td_name = document.createElement('td');
      var td_material = document.createElement('td');
      var p_name = document.createElement('p');
      var p_material = document.createElement('p');
      var img_name = document.createElement('img');
      var span_name = document.createElement('span');
      var img_path =
       type+'/Icon_'+model[type][keys[i]][j].name.replace(/\s/g,'')+'.png';
      tbody.appendChild(tr);

      td_name.setAttribute('class','text-left');
      p_name.setAttribute('class','material_row');
      img_name.setAttribute('class','material_image');
      img_name.setAttribute('height','60');
      img_name.setAttribute('width','60');
      img_name.setAttribute('src',icon_path + img_path);
      span_name.setAttribute('class','material_text');
      span_name.innerHTML = model[type][keys[i]][j].name;
      p_name.appendChild(img_name);
      p_name.appendChild(span_name);
      tbody.appendChild(td_name);

      console.log(model[type][keys[i]][j].name);
    }
  }
}else {
  for(var i=0; i<keys.length; i++) {
    for(var j=0; j<model[keys[i]].length; j++)
    {
      console.log(model[keys[i]][j].name);
    }
  }
}
