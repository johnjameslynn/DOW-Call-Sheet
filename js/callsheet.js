

//SET CALL TIME
var callTime = moment("2015-05-05 16:00");
var callTimeUnix = callTime.unix();

//Check when call time is in relation to now
var now = moment();
var daysLeft = callTime.diff(now,'days',true);
console.log(daysLeft);


var currentWeatherDisplay = document.getElementById("current-weather-display");
var currentWeatherDescription = document.getElementById("current-weather-description");
var currentWeatherTitle = document.getElementById("current-weather-title");


  function getLocation() {
    if (Modernizr.geolocation) {
      navigator.geolocation.getCurrentPosition(displayWeather);
    } else {
      alert("Could not find location");
      // no native support; maybe try a fallback?
    }
  }

  function displayWeather(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;


    if(daysLeft>0 && daysLeft<14){ //callTime is not today, but within 14 days, load forecast... will not load sunrise/sunset...yet
      var apiURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=16&units=imperial';
      console.log("Data being pulled from FORECAST: " + apiURL);
      $.getJSON(apiURL, function(forecastData){

        temp = forecastData.list[Math.round(daysLeft)].temp.day;
        currentWeatherDisplay.innerHTML = Math.round(temp) + "&deg; F";
        currentWeatherDescription.innerHTML = forecastData.city.name + ", " + forecastData.list[Math.round(daysLeft)].weather[0].description;
        currentWeatherTitle.innerHTML = "Location Forecast";


        var adjTemp = (-2.5*temp)+250;
        if (adjTemp > 100) adjTemp = 100;
        if (adjTemp < -50) adjTemp = -50;

        currentWeatherDisplay.style.backgroundColor = "hsl(" + adjTemp + ",80%,50%)";
      });
    }


    if(daysLeft<0){ //call time already happened (will load current weather data);
      apiURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial';
      console.log("Data being pulled from: " + apiURL);
      $.getJSON(apiURL, function(weatherData) {



      currentWeatherDisplay.innerHTML = Math.round(weatherData.main.temp) + "&deg;";
      currentWeatherDescription.innerHTML = weatherData.name + ", " + weatherData.weather[0].description;
      currentWeatherTitle.innerHTML = "Current Temperature";


      var adjTemp = (-2.5*weatherData.main.temp)+250;
      if (adjTemp > 100) adjTemp = 100;
      if (adjTemp < -50) adjTemp = -50;

      currentWeatherDisplay.style.backgroundColor = "hsl(" + adjTemp + ",80%,50%)";


    });
  }
    if (daysLeft<1){
      console.log("Getting Sun");
      apiURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial';
      $.getJSON(apiURL, function(weatherData) {

      var currentSunriseDisplay = document.getElementById("sunrise-display");
      var currentSunsetDisplay = document.getElementById("sunset-display");

      var sunriseUnix = weatherData.sys.sunrise * 1000;
      var sunriseTime = moment(sunriseUnix).format("h:mm A");

      var sunsetUnix = weatherData.sys.sunset * 1000;
      var sunsetTime = moment(sunsetUnix).format("h:mm A");

      currentSunriseDisplay.innerHTML = sunriseTime;
      currentSunsetDisplay.innerHTML = sunsetTime;
    });
  }
  }



  function displayCallTime(){


    var callTimeDisplay = document.getElementById("call-time-display");

    callTimeDisplay.innerHTML = callTime.format("h:mm A");


    if (now < callTime){

      callTimeDisplay.style.backgroundColor = "#EF4836";
    }else{
      callTimeDisplay.style.backgroundColor = "#ABB7B7";
    }


    var callLocation = document.getElementById("call-location");
    var address = callLocation.innerHTML;
    var mapURL = "http://maps.google.com/?q=" + address +"";
    callLocation.href=mapURL;
  }

  /*

  0 = 250
  100 = 0

  y = -.4x + 250

  */
  //  var scale = chroma.scale(['blue', 'red']);
  // scale(0.5).hex(); // #FF7F7F
