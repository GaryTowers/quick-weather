var DEFAULT_LOCATION = "Austin, TX";
var ALTERNATE_LOCATION = "Dallas, TX";
var CURRENT_LOCATION = "";

//Displays the weather data on the DOM
function showWeatherData(data){
    current_temp.html(data.main.temp+" F&deg;");
    humidity.html(data.main.humidity+"%");
    min_temp.html(data.main.temp_min+" F&deg;");
    max_temp.html(" - "+data.main.temp_max+" F&deg;");
    wind_speed.html(data.wind.speed+" mph");
    city_button.html(CURRENT_LOCATION);
    city_location.css("background-image", "url('https://maps.googleapis.com/maps/api/staticmap?center="+ data.name +"&zoom=12&size=500x210&maptype=roadmap&markers=color:red%7C"+data.coord.lat+","+data.coord.lon+"')");
			
    setTimeout(showWeatherBox, 400);		
}

function hideWeatherBox(){
    weather_box.addClass("fadeOutDown");
}

function showWeatherBox(){
    weather_box.removeClass("fadeOutDown");
    weather_box.addClass("fadeInDown");
    weather_box.css("display", "block");
}

//Gets weather information from OpenWeatherMap.org
function requestWeatherInfo(location, callback){
    var api_url = "http://api.openweathermap.org/data/2.5/weather";
    if(! location){
        location = DEFAULT_LOCATION;
    }
    console.log("Requesting weather info for: " + location)
    $.ajax({
        url: api_url,
        data: {
            'q' : location
        },
        success: function(response){
            console.log(response);
            if(response.cod !== 200){
                alert(response.message);
                return;    
            }
            callback(response);
        }
    });
}

//Helper function to get url parameters
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function(){

    weather_box		= $("#weather-box");
    current_temp	= $(".current-temp");
    description		= $(".description");
    humidity		= $(".humidity");
    max_temp		= $(".max-temp");
    min_temp		= $(".min-temp");
    wind_speed		= $(".wind-speed");
    city_button		= $(".city-switch");
    city_location   = $(".location-container");
    city			= $(".city");
    base			= $(".base");

    var new_location = getParameterByName("location");
    if(new_location){
        DEFAULT_LOCATION = new_location;  
           
    }

    CURRENT_LOCATION = DEFAULT_LOCATION;  

    city_button.html(DEFAULT_LOCATION);
    requestWeatherInfo(DEFAULT_LOCATION, showWeatherData);

    //Switch cities
    city_button.on("click", function(){
       // var current_location = $(this).html();     		
		
        if(CURRENT_LOCATION === DEFAULT_LOCATION){
            CURRENT_LOCATION = ALTERNATE_LOCATION;
        }
        else{
            CURRENT_LOCATION = DEFAULT_LOCATION;
        }
        hideWeatherBox();
        requestWeatherInfo(CURRENT_LOCATION, showWeatherData);		
    });


});