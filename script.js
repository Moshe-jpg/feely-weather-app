var apiKey = "82637d580741789f3ab243d8e053d1da";
var searchBtn = document.getElementById("search-btn");
var dropdownMenu = document.getElementById("dropdown-menu");
var row = document.getElementById("row");
var textInput = document.getElementById("text-input");
var savedSearches = JSON.parse(localStorage.getItem("savedSearches"));
var weatherApiRootUrl = 'https://api.openweathermap.org';


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
    var apiUrl = weatherApiRootUrl + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + apiKey;
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
    forecastHead.setAttribute("class", "card-header text-dark bg-warning w-100 font-weight-bold");
    
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
    forecastMain.setAttribute("class", "card-body w-100 font-weight-bold");
    
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
    forecastFooter.setAttribute("class", "card-footer w-100 font-weight-bold");

    // the text content for each forecast will be
    forecastHead.textContent = "City: " + currentInput + " | " + currentDate;
    forecastMain.textContent = "Current Temp: " + data.current.temp + "F | Current Humidity: " + data.current.humidity + "%";
    forecastFooter.textContent = "UV Index: " + data.current.uvi + " | Current Wind Speed: " + data.current.wind_speed + " MPH";
 
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
    
    var futureForecastBody = document.createElement("div");
    futureForecastBody.setAttribute("class", "col-md-8 col-12");
    var futureForecastCard = document.createElement("div");
    futureForecastCard.setAttribute("class", "card text-light bg-info d-flex align-items-center card-box");
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
    var futureDate = moment.unix(data.current.dt).format('dddd, MMMM Do, YYYY | h:mm A');

    // the text content for each card
    cardText1.textContent = "Date:" +  + " | Temp: " + data.daily[0].temp.day + "F | Humidity: " + data.daily[0].humidity + "% | UV Index: " + data.daily[0].uvi + " | Wind Speed: " + data.daily[0].wind_speed + " MPH";
    cardText2.textContent = "Date:" +  + " | Temp: " + data.daily[1].temp.day + "F | Humidity: " + data.daily[1].humidity + "% | UV Index: " + data.daily[1].uvi + " | Wind Speed: " + data.daily[1].wind_speed + " MPH";
    cardText3.textContent = "Date:" +  + " | Temp: " + data.daily[2].temp.day + "F | Humidity: " + data.daily[2].humidity + "% | UV Index: " + data.daily[2].uvi + " | Wind Speed: " + data.daily[2].wind_speed + " MPH";
    cardText4.textContent = "Date:" +  + " | Temp: " + data.daily[3].temp.day + "F | Humidity: " + data.daily[3].humidity + "% | UV Index: " + data.daily[3].uvi + " | Wind Speed: " + data.daily[3].wind_speed + " MPH";
    cardText5.textContent = "Date:" +  + " | Temp: " + data.daily[4].temp.day + "F | Humidity: " + data.daily[4].humidity + "% | UV Index: " + data.daily[4].uvi + " | Wind Speed: " + data.daily[4].wind_speed + " MPH";

    futureForecastCard.append(cardText1);
    futureForecastCard.append(cardText2);
    futureForecastCard.append(cardText3);
    futureForecastCard.append(cardText4);
    futureForecastCard.append(cardText5);
    futureForecastBody.appendChild(futureForecastCard);
    row.appendChild(futureForecastBody);

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
    console.log(event.target.innerHTML);
    createForecast();
    
};



// when you click search, the magic starts
searchBtn.addEventListener("click", getCoordinates);

// For current, data.daily[0].temp.day
// make card that accepts 5 day, and loops through and renders each one