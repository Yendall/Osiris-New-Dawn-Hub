const remote = require('electron').remote;
const main = remote.require('./main.js');

// Fetch firebase data dynamically
$(document).ready(function(){
  // Get a database reference to our posts
  var ref = firebase.database().ref("players/");
  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
    setupCanvas();
    main_func(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});

setupCanvas();
// Setup the canvas
function setupCanvas()
{

  var background = new Image();
  background.src = '../model/assets/images/terrain.jpg';
  background.onload = function() {
    var canvas = document.getElementById('map_canvas');
    var context = document.getElementById('map_canvas').getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var pattern = context.createPattern(background, 'repeat');
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = pattern;
    context.fill();

    var model = remote.getGlobal('resources');
    var keys = ["resources"];
    var type = "craftables";

    var canvas = document.getElementById('map_canvas');

    for(var i=0; i<keys.length; i++) {
      for(var j=0; j<model[keys[i]].length; j++)
      {
        setPoints(model[keys[i]][j],canvas);
      }
    }
  };
}

function setPlayer(model,index)
{
  var canvas = document.getElementById('map_canvas');
  var context = document.getElementById('map_canvas').getContext('2d');
  var lat = model['latitude'].slice(0,-1);
  var lon = model['longitude'].slice(0,-1);
  var pointObj = getPoint(lat,lon,canvas.width,canvas.height);
  var imageObj = new Image(40,40);

  imageObj.onload = function() {
      context.drawImage(imageObj, pointObj.x, pointObj.y,imageObj.width,imageObj.height);
  };
  imageObj.src = '../model/assets/images/astronaut_'+index+'.png';
  console.log(model,index);
}

function setPoints(model,canvas)
{
  var resource = model['name'];
  //console.log(model['name']);
  for(var i=0; i<model['latitudes'].length; i++)
  {
    var pointObj = getPoint(model['latitudes'][i],model['longitudes'][i],canvas.width,canvas.height);
    point(pointObj.x,pointObj.y,resource);
  }
}
// Get point and scale dynamically to canvas size
function getPoint(latitude, longitude, canvas_width, canvas_height) {
  var obj = {};
  obj.x = (latitude * canvas_height / 30) + (canvas_height / 2);
  obj.y = (longitude * canvas_width / 60) + (canvas_width / 2);
  return obj;
}

function point(x, y,name)
{
  var context = document.getElementById('map_canvas').getContext('2d');
  //canvas.beginPath();
  var imageObj = new Image(40,40);
  imageObj.onload = function() {
        context.drawImage(imageObj, x, y,imageObj.width,imageObj.height);
  };
  imageObj.src = '../model/assets/icons/craftables/Icon_'+name+'.png';
}

function scalePreserveAspectRatio(imgW,imgH,maxW,maxH){
    return(Math.min((maxW/imgW),(maxH/imgH)));
}

function main_func(arr)
{
  var index = 0;
  // Set image path
  var icon_path = '../model/assets/images/';
  // Grab DOM
  var tbody = document.getElementById("table_body");
  // Craftables uses a different structure, so differentiate
  for(key in arr)
  {
    setupTable(tbody,arr[key],icon_path,index);
    setPlayer(arr[key],index);
    index++;
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
function setupTable(tbody,model,icon_path,index)
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
   "astronaut_"+index+".png";
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
