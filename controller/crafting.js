/**
 * @file    crafting.js
 * @type    Controller
 * @author  Max Yendall
 * @desc    Controls population of crafting tables and search querying
 *
 */

const remote = require('electron').remote;
const main = remote.require('./main.js');

// Start procedures
main_func();

// Function:  Sets up crafting table details
// @return:   Displayed crafting details in table
function main_func()
{
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
  // Craftables uses a different structure, so differentiate
  if(type == 'craftables')
  {
    for(var i=0; i<keys.length; i++) {
      for(var j=0; j<model[type][keys[i]].length; j++)
      {
        setupTable(tbody,model[type][keys[i]][j],type,icon_path);
      }
    }
  }else {
    for(var i=0; i<keys.length; i++) {
      for(var j=0; j<model[keys[i]].length; j++)
      {
        setupTable(tbody,model[keys[i]][j],type,icon_path);
      }
    }
  }
}

// Function:  Sets up crafting material table details
// @return:   Displayed crafting material details in table
function setupMaterials(tr,tbody,model,type,icon_path)
{
  var td_mat = document.createElement('td');
  td_mat.setAttribute('class','text-left');
  for(var i=0; i<model['materials'].length; i++)
  {
      var img_path =
        'craftables'+'/Icon_'+model['materials'][i].replace(/\s/g,'')+'.png';
      var p_mat = document.createElement('p');
      var img_mat = document.createElement('img');
      var span_mat = document.createElement('span');
      p_mat.setAttribute('class','material-row');
      img_mat.setAttribute('class','material-image');
      img_mat.setAttribute('height','60');
      img_mat.setAttribute('width','60');
      img_mat.setAttribute('src',icon_path + img_path);
      span_mat.setAttribute('class','material-text');
      span_mat.innerHTML = model['amount'][i] + " x " + model['materials'][i];
      p_mat.appendChild(img_mat);
      p_mat.appendChild(span_mat);
      td_mat.appendChild(p_mat);

  }
  tr.appendChild(td_mat);
  tbody.appendChild(tr);
}

// Function:  Sets up crafting table details
// @return:   Displayed crafting details in table
function setupTable(tbody,model,type,icon_path)
{
  // Set TR and TD elements
  var tr = document.createElement('tr');
  var td_name = document.createElement('td');
  var p_name = document.createElement('p');
  var img_name = document.createElement('img');
  var span_name = document.createElement('span');
  var img_path =
   type+'/Icon_'+model.name.replace(/\s/g,'')+'.png';
  td_name.setAttribute('class','text-left');
  td_name.setAttribute('id','craft_name');
  p_name.setAttribute('class','material-row');
  img_name.setAttribute('class','name-image');
  img_name.setAttribute('height','60');
  img_name.setAttribute('width','60');
  img_name.setAttribute('src',icon_path + img_path);
  span_name.setAttribute('class','material-text');
  span_name.innerHTML = model.name;
  p_name.appendChild(img_name);
  p_name.appendChild(span_name);
  td_name.appendChild(p_name);
  tr.appendChild(td_name);
  setupMaterials(tr,tbody,model,type,icon_path);
}
// Function:  JQUERY Search function to filter rows based on user query
// @return:   Filtered rows
var $rows = $('#details_table tr');
$('#search').keyup(function() {
    var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        reg = RegExp(val, 'i'),
        text;
    $rows.show().filter(function() {
        text = $(this).text().replace(/\s+/g, ' ');
        return !reg.test(text);
    }).hide();
});
