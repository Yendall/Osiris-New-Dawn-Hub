/**
 * @file    map.js
 * @type    Controller
 * @author  Max Yendall
 * @desc    Controls population of resource locations
 *
 */

const remote = require('electron').remote;
const main = remote.require('./main.js');

// Start procedures
main_func();

// Function:  Sets up resource table details
// @return:   Displayed resource details in table
function main_func()
{
  // Fetch type of crafting
  var type = remote.getGlobal('craftingType');
  // Set image path
  var icon_path = '../model/assets/icons/';
  var model = remote.getGlobal('resources');
  var keys = ["resources"];
  var type = "craftables";
  // Grab DOM
  var tbody = document.getElementById("table_body");
  // Craftables uses a different structure, so differentiate
  for(var i=0; i<keys.length; i++) {
    for(var j=0; j<model[keys[i]].length; j++)
    {
      setupTable(tbody,model[keys[i]][j],type,icon_path);
    }
  }
}

// Function:  Sets up resource materials in table element
// @params:   tr: table row, tbody: table body, model: resources, type: sub-class
// @return:   Displayed resource details in table
function setupMaterials(tr,tbody,model,type)
{
  var td_lat = document.createElement('td');
  td_lat.setAttribute('class','text-center');
  for(var i=0; i<model['latitudes'].length; i++)
  {
      var p_lat = document.createElement('p');
      var span_lat = document.createElement('span');
      p_lat.setAttribute('class','material-row');
      span_lat.setAttribute('class','material-text');
      span_lat.innerHTML = model['latitudes'][i];
      p_lat.appendChild(span_lat);
      td_lat.appendChild(p_lat);
  }
  tr.appendChild(td_lat);

  var td_lon = document.createElement('td');
  td_lon.setAttribute('class','text-center');
  for(var i=0; i<model['longitudes'].length; i++)
  {
      var p_lon = document.createElement('p');
      var span_lon = document.createElement('span');
      p_lon.setAttribute('class','material-row');
      span_lon.setAttribute('class','material-text');
      span_lon.innerHTML = model['longitudes'][i];
      p_lon.appendChild(span_lon);
      td_lon.appendChild(p_lon);
  }
  tr.appendChild(td_lon);
  //console.log(tr);
  tbody.appendChild(tr);
}

// Function:  Sets up resource materials in table element
// @params:   tbody: table body, model: resources, type: sub-class, icon_path
//            absolute path
// @return:   Displayed resource details in table
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
  setupMaterials(tr,tbody,model,type);
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
