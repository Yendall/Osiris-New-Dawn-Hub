const remote = require('electron').remote;
const main = remote.require('./main.js');
var initial = true;
$(document).ready(function(){
  // Get a database reference to our posts
  var ref = firebase.database().ref("players/");
  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
    main_func(snapshot.val());

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});

function main_func(arr)
{
  // Set image path
  var icon_path = '../model/assets/images/';
  // Grab DOM
  var tbody = document.getElementById("table_body");
  // Craftables uses a different structure, so differentiate
  for(key in arr)
  {
    setupTable(tbody,arr[key],icon_path);
  }
}
function setupDetails(tr,value,location_flag,location_string)
{
  var td_lat = document.createElement('td');
  td_lat.setAttribute('class','text-center');
  var p_lat = document.createElement('p');
  var span_lat = document.createElement('span');
  p_lat.setAttribute('class','material-row');
  span_lat.setAttribute('class','material-text');
  if(location_flag)
  {
    span_lat.setAttribute('id',location_string);
  }
  span_lat.innerHTML = value;
  p_lat.appendChild(span_lat);
  td_lat.appendChild(p_lat);
  tr.appendChild(td_lat);
}
function setupTable(tbody,model,icon_path)
{

  var row = document.getElementById(model.playerName);
  if(row != null)
  {
    row.parentNode.removeChild(row);
  }

  // Set TR and TD elements
  var tr = document.createElement('tr');
  tr.setAttribute('id',model.playerName);
  var td_name = document.createElement('td');
  var p_name = document.createElement('p');
  var img_name = document.createElement('img');
  var span_name = document.createElement('span');
  var img_path =
   "astronaut.png";
  td_name.setAttribute('class','text-left');
  td_name.setAttribute('id','craft_name');
  p_name.setAttribute('class','material-row');
  img_name.setAttribute('class','name-image');
  img_name.setAttribute('height','60');
  img_name.setAttribute('width','60');
  img_name.setAttribute('src',icon_path + img_path);
  span_name.setAttribute('class','material-text');
  span_name.innerHTML = model.playerName;
  p_name.appendChild(img_name);
  p_name.appendChild(span_name);
  td_name.appendChild(p_name);
  tr.appendChild(td_name);

  setupDetails(tr,"Online",false);
  setupDetails(tr,model.latitude,true,"latitude");
  setupDetails(tr,model.longitude,true,"longitude");
  tbody.appendChild(tr);
  //setupMaterials(tr,tbody,model,type);
}
