// initial variable declaration
var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#City');
var todayBox = document.querySelector('#today-box');
var dayList = document.querySelector('#day-list');
var dayCityTitle = document.getElementById('today-date');
var currentTemp = document.getElementById('today-temp');
var currentHum = document.getElementById('today-hum');
var currentWind = document.getElementById('today-wind');
var currentuvi = document.getElementById('today-uv');
var cardContainer = document.getElementById('5day-container');
var weatherCards = document.getElementById('')
var locationIcon = document.querySelector('.weather-icon');

var pastCity = []
console.log('pastCity',pastCity);

// stores the used city names in array in local storage
var storedCity = JSON.parse(localStorage.getItem('Cities'));
console.log('storedCity',storedCity);

// function of the search button
var cityForm = function (event){
    event.preventDefault();

    var City = cityInputEl.value.trim();
    if(City) {
        getTodayWeather(City)
        pastCity.push(City);
        localStorage.setItem('Cities', JSON.stringify(pastCity));
        console.log(City);
        dayCityTitle.textContent = City + " " +moment().format('l');
        // removes created 5 day forecast cards if they r there already
        cardContainer.innerHTML = "";
        
    } else {
        alert('Please enter a city')
    }
};


// first api call primarily to obtain the lat and long data
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
// second functino call to obtain the data used to disply
var displayDayForecast = function(lat, long) {
    var forecastApi = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&units=imperial&exclude=hourly,minutely&appid=8066018655ed008933d2f7b865448329';

    fetch(forecastApi)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);

        
    //    grabs the data for the current days weather card
       var icon = data.current.weather[0].icon;
       locationIcon.innerHTML = `<img src="icons/${icon}.png">`
       currentTemp.textContent = 'Temp: ' + data.current.temp;
       currentWind.textContent = 'Wind: ' + data.current.wind_speed;
       currentHum.textContent = 'Humidity: ' + data.current.humidity;
       currentuvi.textContent = 'UV Index: ' + data.current.uvi;
        
        

// changes the background color of the UV index section of the Current days weather card based on the UV vlaue
       if (data.current.uvi <=2 ) {
           currentuvi.classList = 'favorable'
       }

       else if (data.current.uvi <= 7 && data.currentuvi >= 3) {
        currentuvi.classList = 'moderate'
         }

         if (data.current.uvi >= 8 ) {
            currentuvi.classList = 'severe'
        }
             
        // if (weather = "Rain") {
        //     dayCityTitle.classList = 'fas fa-cloud-rain'
        // }
        // else if (weather = 'Clouds') {
        //     dayCityTitle.classList = 'fas fa-cloud-sun'
        // }

        // for loop to create the 5 day forecast cards
       for (var i = 1; i < 6; i++) {
        //    grabs the data from the api and creates the sections in the 5 day forecast cards
            var dailyTemp = 'Temp: ' + data.daily[i].temp.day;
            var dailyWind= 'Wind: ' + data.daily[i].wind_speed;
            var dailyHum= 'Humidity: ' + data.daily[i].humidity;
            var futureDate = moment().add(i, 'days').format('l');
            var icon = data.daily[i].weather[0].icon;
            

           
        // creates the cards and adds them to the HTML text
             var card = document.createElement('div');
             card.className = 'card';
             
             var cardBody = document.createElement('div');
             cardBody.className = 'card-body';

             var title = document.createElement('h5');
             title.innerText = futureDate;
             title.className = 'card-title';

             var weatherList = document.createElement('ul')
             weatherList.className = 'list-group list-group-flush'

             var weatherIcon = document.createElement('li');
             weatherIcon.className = 'list-group-item';
             weatherIcon.innerHTML = `<img src="icons/${icon}.png">`

             var tempList = document.createElement('li');
             tempList.className = 'list-group-item';
             tempList.innerText = dailyTemp;

             var windList = document.createElement('li');
             windList.className = 'list-group-item';
             windList.innerText = dailyWind;

             var humList = document.createElement('li');
             humList.className = 'list-group-item';
             humList.innerText = dailyHum;

             cardBody.appendChild(title);
             cardBody.appendChild(weatherList);
             weatherList.appendChild(weatherIcon);
             weatherList.appendChild(tempList);
             weatherList.appendChild(windList);
             weatherList.appendChild(humList);
             card.appendChild(cardBody);
             cardContainer.appendChild(card);

             


       }
            })
        }
    })
    
}

// function weatherImage() {
//     if ()
// }
// event listener for the first button
cityFormEl.addEventListener('submit', cityForm);