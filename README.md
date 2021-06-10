# Homework-6 (Weather_DashBoard)
## Links

[Repository](https://github.com/Aladd616/Weather_Dashboard_ALL)

[Pages](https://aladd616.github.io/Weather_Dashboard_ALL/)

## Description

A webpage that shows PResents the user with a search bar prompting them to enter the name of a city.  Upon entering a city name and hitting the search button, the user is presented with the the name of the city and the current date as well as the current current days forecast for the city, including humidity, UV index Wind, and Humidity in a card at the top of the screen.  In the body of the page the user is presented with the 5 day forecast in the form of 5 cards with temperature, wind speed, and humidity each labeled with a date within the next 5 days as well as an icon indicating the weather at the time.

This page uses the OpenWeather API to obtain the weather data used in this app.  Two api calls are used in this app.  The first is used to obtain the latitude and longitude data for the entered city and these 2 pieces of information are used as parameters in the second api call in order to obtain the most accurate weather data.  The icons are stored in a separate folder and accessed using references within the openweather object.

### Resources
found the folder holding the png files used for the icons here:
[resource repo](https://github.com/yuvraaaj/openweathermap-api-icons)

