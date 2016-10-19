/**
 * @file    serverinfo.js
 * @type    Controller
 * @author  Max Yendall
 * @desc    Controls population of real-time map and player information
 *
 */

const remote = require('electron').remote;
const main = remote.require('./main.js');

// Inital setup
setupCanvas();

// Function:  Document ready function to fetch Firebase variables
//            When a variable is changed in Firebase, the model is updated
//            dynamically and updated in the table and HTML5 map
// @return:   dynamic Firebase fetching
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

// Function:  Setup canvas object with patterns, resources and players
// @return:   Fully populated canvas element
function setupCanvas()
{
  // Set background, once this has been done load the other objects
  var background = new Image();
  // Using mars terrain
  background.src = '../model/assets/images/terrain.jpg';
  // Onload function for proper depth control
  background.onload = function()
  {
    var model = remote.getGlobal('resources');
    var keys = ["resources"];
    var type = "craftables";
    var canvas = document.getElementById('map_canvas');
    var context = document.getElementById('map_canvas').getContext('2d');
    var pattern = context.createPattern(background, 'repeat');

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = pattern;
    context.fill();
    for(var i=0; i<keys.length; i++) {
      for(var j=0; j<model[keys[i]].length; j++)
      {
        setPoints(model[keys[i]][j],canvas);
      }
    }
  };
}

// Function:  Setup player models based on who is connected
// @params:   model: player JSON, index: player identifier
// @return:   Updated canvas model with players
function setPlayer(model,index)
{
  // Obtain canvas and content
  var canvas = document.getElementById('map_canvas');
  var context = document.getElementById('map_canvas').getContext('2d');
  // Trim degrees sign from location values
  var lat = model['latitude'].slice(0,-1);
  var lon = model['longitude'].slice(0,-1);
  // Obtain transformed canvas co-ordinates
  var pointObj = getPoint(lat,lon,canvas.width,canvas.height);
  // Begin creating the avatar for each player based on their identifiers
  var imageObj = new Image(40,40);
  imageObj.src = '../model/assets/images/astronaut_'+index+'.png';
  imageObj.onload = function() {
      context.drawImage(imageObj, pointObj.x, pointObj.y,imageObj.width,imageObj.height);
  };
}

// Function:  Setup location object for resources
// @params:   model: player JSON, index: player identifier
// @return:   Updated canvas model with players
function setPoints(model,canvas)
{
  // Set resource name
  var resource = model['name'];
  // Loop through all the different locations and create objects
  for(var i=0; i<model['latitudes'].length; i++)
  {
    var pointObj = getPoint(
      model['latitudes'][i],model['longitudes'][i],canvas.width,canvas.height);
    point(pointObj.x,pointObj.y,resource);
  }
}

// Function:  Obtain location relative to the canvas
// @params:   latitude: x, longitude: y, width: width, canvas, height: canvas
// @return:   Relative transform for canvas position
function getPoint(latitude, longitude, width, height) {
  var obj = {};
  obj.x = (latitude * canvas_height / 30) + (canvas_height / 2);
  obj.y = (longitude * canvas_width / 60) + (canvas_width / 2);
  return obj;
}

// Function:  Set point on map as an image
// @params:   x: x, y: y, name: resource name
// @return:   Image on canvas element
function point(x, y,name)
{
  var context = document.getElementById('map_canvas').getContext('2d');
  var imageObj = new Image(40,40);

  imageObj.src = '../model/assets/icons/craftables/Icon_'+name+'.png';
  imageObj.onload = function() {
        context.drawImage(imageObj, x, y,imageObj.width,imageObj.height);
  };
}

// Function:  Return scaled image with maintained aspect ratio
// @params:   imgW: width, imgH: height, maxW: canvas, maxH: canvas
// @return:   Scaled image
function scalePreserveAspectRatio(imgW,imgH,maxW,maxH){
    return(Math.min((maxW/imgW),(maxH/imgH)));
}

// Function:  Sets up player table details
// @params:   arr: player model from Firebase
// @return:   Displayed player details in table
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
    setPlayer(arr[key],index);
    setupTable(tbody,arr[key],icon_path,index);
    index++;
  }
}

// Function:  Sets up player table details
// @params:   tr: table row, value: location value
// @return:   Displayed player details in table
function setupDetails(tr,value)
{
  var td_lat = document.createElement('td');
  td_lat.setAttribute('class','text-center');
  var p_lat = document.createElement('p');
  var span_lat = document.createElement('span');
  p_lat.setAttribute('class','material-row');
  span_lat.setAttribute('class','material-text');
  span_lat.innerHTML = value;
  p_lat.appendChild(span_lat);
  td_lat.appendChild(p_lat);
  tr.appendChild(td_lat);
}

// Function:  Sets up player table details
// @params:   tbody: table body, model: player model, icon_path: path, index:
//            player index
// @return:   Displayed player details in table
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
  setupDetails(tr,model.latitude);
  setupDetails(tr,model.longitude);
  tbody.appendChild(tr);
}
