var x = document.getElementById("demo");
var weather;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
  // Draw to canvas
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

/*
// Create global weather variable
var weather;



function preload() {
  var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
  weather = loadJSON(url);
}

function setup() {
  var myCanvas = createCanvas(600, 400);
  myCanvas.parent('tabula-rasa');

  noLoop();
}

function draw() {
  background(255);

  // Canvas grid
  stroke(220);
  for (var x = 0; x < width; x += 20) {
    line(x, 0, x, height);
  }
  for (var y = 0; y < height; y += 20) {
    line(0, y, width, y);
  }

  // Text formatting
  noStroke();
  fill(0); // black
  textFont('Helvetica');
  textSize(26);

  // Get the wind direction from the JSON data we loaded
  var windDirection = weather.wind.deg;
  // Draw to canvas
  text('Wind direction: ' + windDirection, 20, 40);

  // Get the wind speed
  var windSpeed = weather.wind.speed;
  // Draw to canvas
  text('Wind speed: ' + windSpeed, 20, 80);

  // Get the current temperature
  var currentTemp = weather.main.temp;
  // Draw to canvas
  text('Current temp: ' + currentTemp, 20, 120);

  // Get the current humidity from the JSON data loaded
  var currentHumidity = weather.main.humidity;
  text('Humidity: ' + currentHumidity, 20, 160);
} */
