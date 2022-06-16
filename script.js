var apiKey = "82637d580741789f3ab243d8e053d1da";
var searchBtn = document.getElementById("search-btn");
var dropdownMenu = document.getElementById("dropdown-menu");
var row = document.getElementById("row");
var textInput = document.getElementById("text-input");
var savedSearches = JSON.parse(localStorage.getItem("savedSearches"));
var weatherApiRootUrl = 'https://api.openweathermap.org';
// http://openweathermap.org/img/wn/10d@2x.png


var getCoordinates = function (){
    var city = textInput.value;
    var apiUrl = weatherApiRootUrl + "/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;
    fetch (apiUrl).then(function (results){
        return results.json();
    })
    .then(function (data){
        getWeather(data[0]);
    })
};

var getWeather = function (data){
    var lat = data.lat;
    var lon = data.lon;
    var city = data.name;
    var apiUrl = weatherApiRootUrl + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=minutely,hourly&appid=" + apiKey;
    fetch (apiUrl).then(function (results){
        return results.json();
    })
    .then(function (data){
        console.log(data);
        createForecast(data, city);
        createFutureForecast(data, city);
    })
}

// if no savedSearches exist, create an array
if (!savedSearches){
    savedSearches = [];
};


// a function to save searches to localStorage
var saveSearch = function (){
    var textInputValue = textInput.value;
    savedSearches.push(textInputValue);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
};

// create a forecast whenever the button is clicked
var createForecast = function (data, event){

    // create the column
    var forecastBody = document.createElement("div");
    forecastBody.setAttribute("class", "col-md-4 col-12");

    // create the card
    var forecastCard = document.createElement("div");
    forecastCard.setAttribute( "class", "card text-light bg-info d-flex align-items-center card-box");

    // create the header
    var forecastHead = document.createElement("div");
    forecastHead.setAttribute("class", "card-header text-dark bg-warning w-100");
    
    // put the current date inside the text
    var currentDate = moment.unix(data.current.dt).format('dddd, MMMM Do, YYYY | h:mm A');

    // get the icons
    var iconUrl = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
    var iconDescription = data.current.weather[0].description;

    // put the current input value inside the text
    var currentInput = textInput.value;
    
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("class", "weather-img");
    weatherIcon.setAttribute("src", iconUrl);
    weatherIcon.setAttribute("alt", iconDescription);

    // create the main content area
    var forecastMain = document.createElement("div");
    forecastMain.setAttribute("class", "card-body w-100");
    
    // create the footer area
    var forecastFooter = document.createElement("div");

    // give the footer a special colour depending on UV index favourability
    if (data.current.uvi <= 3){
        forecastFooter.style.color = "#ffffff";
    } if (data.current.uvi > 3 && data.current.uvi <= 6){
        forecastFooter.style.color = "#a8d112";
    } if (data.current.uvi > 6){
        forecastFooter.style.color = "#e21313";
    }
    // give the footer the rest of its classes
    forecastFooter.setAttribute("class", "card-footer w-100");

    // the text content for each forecast will be
    forecastHead.textContent = "City: " + currentInput + " | " + currentDate;
    forecastMain.textContent = "Current Temp: " + data.current.temp + "C | Current Humidity: " + data.current.humidity + "%";
    forecastFooter.textContent = "UV Index: " + data.current.uvi + " | Current Wind Speed: " + data.current.wind_speed + " km/h";
 
    // append all the created elements into the card
    forecastCard.append(weatherIcon);
    forecastCard.append(forecastHead);
    forecastCard.append(forecastMain);
    forecastCard.append(forecastFooter);

    // append the card to the column
    forecastBody.appendChild(forecastCard);

    // append the column to the row
    row.appendChild(forecastBody);

    // save the search every time the forecast is created
    saveSearch();
    addToSearch(currentInput, event);
};

var createFutureForecast = function (data){
    // create the column
    var futureForecastBody = document.createElement("div");
    futureForecastBody.setAttribute("class", "col-md-8 col-12");

    // create the card
    var futureForecastCard = document.createElement("div");
    futureForecastCard.setAttribute("class", "card text-light bg-info d-flex align-items-center card-box");

    // create the header
    var futureForecastHeader = document.createElement("h5");
    futureForecastHeader.setAttribute("class", "card-header text-info bg-light font-weight-bold");

    // the new p tags will container the future conditions in each one
    var cardText1 = document.createElement("p");
    cardText1.setAttribute("class", "card-text w-100 mt-3 mb-3 pr-5 pl-5");
    var cardText2 = document.createElement("p");
    cardText2.setAttribute("class", "card-text w-100 mt-3 mb-3 pr-5 pl-5");
    var cardText3 = document.createElement("p");
    cardText3.setAttribute("class", "card-text w-100 mt-3 mb-3 pr-5 pl-5");
    var cardText4 = document.createElement("p");
    cardText4.setAttribute("class", "card-text w-100 mt-3 mb-3 pr-5 pl-5");
    var cardText5 = document.createElement("p");
    cardText5.setAttribute("class", "card-text w-100 mt-3 mb-3 pr-5 pl-5");

    // put the future date inside the text
    var day1 = moment.unix(data.current.dt).add(1, 'days').format('dddd, Do');
    var day2 = moment.unix(data.current.dt).add(2, 'days').format('dddd, Do');
    var day3 = moment.unix(data.current.dt).add(3, 'days').format('dddd, Do');
    var day4 = moment.unix(data.current.dt).add(4, 'days').format('dddd, Do');
    var day5 = moment.unix(data.current.dt).add(5, 'days').format('dddd, Do');

    // data.daily[0].weather[0].icon  data.daily[0].weather[0].main == "Thunderstorm" 
    

    // text content for card header
    futureForecastHeader.textContent = "5 Day Forecast";
    
    // I know this next piece of code is very badly written but I was running out of time and had to make it work.......



    // conditions rain
    if (data.daily[0].weather[0].main == "Rain" || data.daily[0].weather[0].main == "Thunderstorm" || data.daily[0].weather[0].main == "Drizzle"){
        cardText1.classList.add("bi-cloud-rain-heavy");
    } if (data.daily[1].weather[0].main == "Rain" || data.daily[1].weather[0].main == "Thunderstorm" || data.daily[1].weather[0].main == "Drizzle") {
        cardText2.classList.add("bi-cloud-rain-heavy");
    } if (data.daily[2].weather[0].main == "Rain" || data.daily[2].weather[0].main == "Thunderstorm" || data.daily[2].weather[0].main == "Drizzle") {
        cardText3.classList.add("bi-cloud-rain-heavy");
    } if (data.daily[3].weather[0].main == "Rain" || data.daily[3].weather[0].main == "Thunderstorm" || data.daily[3].weather[0].main == "Drizzle") {
        cardText4.classList.add("bi-cloud-rain-heavy");
    } if (data.daily[4].weather[0].main == "Rain" || data.daily[4].weather[0].main == "Thunderstorm" || data.daily[4].weather[0].main == "Drizzle") {
        cardText5.classList.add("bi-cloud-rain-heavy");
    }

    // conditions clear
    if (data.daily[0].weather[0].main == "Clear"){
        cardText1.classList.add("bi-brightness-high");
    } if (data.daily[1].weather[0].main == "Clear"){
        cardText2.classList.add("bi-brightness-high");
    } if (data.daily[2].weather[0].main == "Clear"){
        cardText3.classList.add("bi-brightness-high");
    } if (data.daily[3].weather[0].main == "Clear"){
        cardText4.classList.add("bi-brightness-high");
    } if (data.daily[4].weather[0].main == "Clear"){
        cardText5.classList.add("bi-brightness-high");
    } 

    // conditions snow
    if (data.daily[0].weather[0].main == "Snow"){
        cardText1.classList.add("bi bi-snow3");
    } if (data.daily[1].weather[0].main == "Snow"){
        cardText2.classList.add("bi bi-snow3");
    } if (data.daily[2].weather[0].main == "Snow"){
        cardText3.classList.add("bi bi-snow3");
    } if (data.daily[3].weather[0].main == "Snow"){
        cardText4.classList.add("bi bi-snow3");
    } if (data.daily[4].weather[0].main == "Snow"){
        cardText5.classList.add("bi bi-snow3");
    } 

    // conditions clouds
    if (data.daily[0].weather[0].main == "Clouds"){
        cardText1.classList.add("bi-clouds");
    } 
    if (data.daily[1].weather[0].main == "Clouds"){
        cardText2.classList.add("bi-clouds");
    } 
    if (data.daily[2].weather[0].main == "Clouds"){
        cardText3.classList.add("bi-clouds");
    } 
    if (data.daily[3].weather[0].main == "Clouds"){
        cardText4.classList.add("bi-clouds");
    } 
    if (data.daily[4].weather[0].main == "Clouds"){
        cardText5.classList.add("bi-clouds");
    }

    // text content for each card
    cardText1.textContent = " Date: " + day1 + " | Temp: " + data.daily[0].temp.day + "C | Humidity: " + data.daily[0].humidity + "% | UV Index: " + data.daily[0].uvi + " | Wind Speed: " + data.daily[0].wind_speed + " km/h";
    cardText2.textContent = " Date: " + day2 + " | Temp: " + data.daily[1].temp.day + "C | Humidity: " + data.daily[1].humidity + "% | UV Index: " + data.daily[1].uvi + " | Wind Speed: " + data.daily[1].wind_speed + " km/h";
    cardText3.textContent = " Date: " + day3 + " | Temp: " + data.daily[2].temp.day + "C | Humidity: " + data.daily[2].humidity + "% | UV Index: " + data.daily[2].uvi + " | Wind Speed: " + data.daily[2].wind_speed + " km/h";
    cardText4.textContent = " Date: " + day4 + " | Temp: " + data.daily[3].temp.day + "C | Humidity: " + data.daily[3].humidity + "% | UV Index: " + data.daily[3].uvi + " | Wind Speed: " + data.daily[3].wind_speed + " km/h";
    cardText5.textContent = " Date: " + day5 + " | Temp: " + data.daily[4].temp.day + "C | Humidity: " + data.daily[4].humidity + "% | UV Index: " + data.daily[4].uvi + " | Wind Speed: " + data.daily[4].wind_speed + " km/h";

    futureForecastCard.append(futureForecastHeader), futureForecastCard.append(cardText1), futureForecastCard.append(cardText2), futureForecastCard.append(cardText3), futureForecastCard.append(cardText4), futureForecastCard.append(cardText5), futureForecastBody.appendChild(futureForecastCard), row.appendChild(futureForecastBody);
};


// whenever a search is made, the city can be searched again
var addToSearch = function (currentInput){
    var savedElement = document.createElement("div");
    savedElement.setAttribute("class", "dropdown-item");
    savedElement.setAttribute("type", "button");
    savedElement.setAttribute("id", currentInput);
    savedElement.textContent = currentInput;
    dropdownMenu.appendChild(savedElement);
    dropdownMenu.addEventListener("click", searchAgain);
};

var searchAgain = function (event){
    var city = event.target.id
    var apiUrl = weatherApiRootUrl + "/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;
    fetch (apiUrl).then(function (results){
        return results.json();
    })
    .then(function (data){
        getWeather(data[0]);
    })
};

// when you click search, the magic starts
searchBtn.addEventListener("click", getCoordinates);