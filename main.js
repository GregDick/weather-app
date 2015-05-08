var API_URL = 'http://api.wunderground.com/api/1a83bcf806654e1a/geolookup/forecast/q/';
var forecast = document.querySelector('.forecast');
var button = document.querySelector('input[type = button]');

function getAutoIPTemp(){
  getJSON(API_URL+'autoip.json', change);
}

function getZipTemp(){
  var zip = document.querySelector('input[name = zipcode]').value;
  getJSON(API_URL+ zip +'.json', change);
}

function change(data){  
  var htmltext='';
  htmltext+= data.location.city +', '+data.location.state+'\n';
	htmltext += data.forecast.txt_forecast.forecastday[0].fcttext;
  forecast.innerHTML = htmltext;
}

function getJSON(url, cb){
  var xhr = new XMLHttpRequest();
  
  xhr.open('GET', url);
  xhr.onload = function(){
    if(this.status >= 200 && this.status < 400){
      cb(JSON.parse(this.response));
    }
  };
  
  xhr.send();
}

window.onload = getAutoIPTemp;
button.onclick = getZipTemp;
