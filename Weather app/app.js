console.log("Welcome to weather");

const icon = document.querySelector(".icon");
const tempValue = document.getElementById("tempValue");
const wind = document.querySelector(".wind p");
const discription = document.getElementById("description");
const locationElement = document.getElementById("location1");
const notification = document.querySelector(".notification");
const pressure = document.querySelector(".pressure p");

window.addEventListener("load", function location() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
})

function success(position) {
    let latitude;
    let longitude;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=81adf960275271b0b800d8b75b4cf739`;

    fetch(url).then(Response => {
        return Response.json();
    }).then(data => {
        console.log(data);

        let temp = data.main.temp;
        tempValue.innerHTML = Math.floor(temp - 273.15) + `°<span>C</span>`;

        let wind1 = data.wind.speed;
        wind.innerHTML = wind1 + "<span> KM/H </span>";

        let desc = data.weather[0]["description"];
        description.innerHTML = desc;

        let city = data.name;
        let country = data.sys.country;
        location1.innerHTML = city + ", " + country;

        let icon1 = data.weather[0]["icon"];
        icon.innerHTML = `<img src="icons/${icon1}.png"/>`;

        let press = data.main.pressure;
        pressure.innerHTML = press + " hPa";
    })
}

function error() {
    let message = "Browser doesn't support geolocation";
    alert("Please turn on your location");
    notification.style.display = "block";
    notification.innerHTML = `<p> ${message} </p>`;
}