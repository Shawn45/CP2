document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  //console.log(value);
  //fetch the weather
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=504a9f57bba961aa706a47683f8a813f";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      //console.log(json);
      let results = "";
      results += '<h2>Today ' + moment(1000*json.dt).format('MMMM Do YYYY') + "</h2>"; 
      results += '<h2>Weather in ' + json.name + "</h2>";

      results += '<h3>Temperature: ' + json.main.temp + " &deg;F</h3>"
      results += '<h3>Feels like:    ' + json.main.feels_like + " &deg;F</h3>"
      for (let i=0; i < json.weather.length; i++) {
	results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	results += json.weather[i].description
	if (i !== json.weather.length - 1)
	  results += ", "
      }
      results += "</p>";
      results += '<h3>Clouds: ' + json.clouds.all + " %</h3>";
      results += '<h3>Humidity: ' + json.main.humidity + " %</h3>";
      results += '<h3>Wind speed: ' + json.wind.speed + " m/h</h3>";
      results += '<h3>Sunrise ' + moment(1000*json.sys.sunrise).format('h:mm:ss a') + "</h3>";
      results += '<h3>Sunset ' + moment(1000*json.sys.sunset).format('h:mm:ss a') + "</h3>";

      document.getElementById("weatherResults").innerHTML = results;
    });


  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=504a9f57bba961aa706a47683f8a813f";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
     // console.log(json);
     let forecast = "";
	forecast += "<h2>5-Day Forecast:</h2>"
      for (let i=0; i < json.list.length; i++) {
	forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h a') + "</h2>";
	forecast += "<p>Temperature: " + json.list[i].main.temp + " &deg;F</p>";
	forecast += "<p>Feels like:  " + json.list[i].main.feels_like + " &deg;F</p>";
	forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
	forecast += '<p>Clouds: ' + json.list[i].clouds.all + " %</p>";
	forecast += '<p>Humidity: ' + json.list[i].main.humidity + " %</p>";
	forecast += '<p>Wind speed: ' + json.list[i].wind.speed + " m/h</p>";

      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});

