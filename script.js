var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#City');
var todayBox = document.querySelector('#today-box');
var dayList = document.querySelector('#day-list');

var pastCity = []
console.log('pastCity',pastCity);


var storedCity = JSON.parse(localStorage.getItem('Cities'));
console.log('storedCity',storedCity);

var cityForm = function (event){
    event.preventDefault();

    var City = cityInputEl.value.trim();
    if(City) {
        getTodayWeather(City)
        pastCity.push(City);
        localStorage.setItem('Cities', JSON.stringify(pastCity));
        console.log(City);

        // todayBox.textContent = '';
        // cityInputEl.value = '';
    } else {
        alert('Please enter a city')
    }
};



var getTodayWeather = function (city) {
    var todayApi = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=8066018655ed008933d2f7b865448329';

    fetch(todayApi)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);

            var lat = data.coord.lat;
            var long = data.coord.lon;
                    console.log('lat',lat);
                    console.log('long',long);
            displayDayForecast(lat, long);
                })
            }
        })
}

var displayDayForecast = function(lat, long) {
    var forecastApi = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&units=imperial&exclude=hourly,minutely&appid=8066018655ed008933d2f7b865448329';

    fetch(forecastApi)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);

        
       var date = moment().format('l');
       var currentTemp= data.current.temp;
       var currentWind= data.current.wind_speed;
       var currentHum= data.current.humidity;
       var currentuvi= data.current.uvi;

        
       for (var i = 1; i < data.daily.length; i++) {
            var dailyTemp = data.daily[i].temp.day;
            var dailyWind= data.daily[i].wind_speed;
            var dailyHum= data.daily[i].humidity;
            var futureDate = moment().add(i, 'days').format('l');

       }
            })
        }
    })
}

cityFormEl.addEventListener('submit', cityForm);