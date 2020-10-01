const api = {
    key: "",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
} 

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
   if (evt.keyCode == 13) {
       getResults(searchBox.value);
    //    console.log(searchBox.value);
   } 
}

function getResults (query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResult);
}

function displayResult (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dataBuilder(now);

    let temp = document.querySelector('.current .temp ');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weahter_el = document.querySelector('.current .weather');
    weahter_el.innerText = weather.weather[0].description;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dataBuilder (d) {
    let months = ["Enero", "Febrero", "Marzo", "Abril", "mayo", "junio", "julio", "Agosto"
    , "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes","Sabado" ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
