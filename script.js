const input_field = document.querySelector("input");
const search_btn = document.querySelector("button");
const city_name = document.querySelector(".city");
const temp_value = document.getElementById("temp_deg");
const humidity = document.getElementById("humidity_value");
const wind_speed = document.getElementById("wind_value");
let weather_type_img = document.querySelector(".temp_type");
console.log(weather_type_img);

search_btn.addEventListener("click" , function(e) {
    e.preventDefault();
    const name = input_field.value;
    // console.log(name);
    getData(name);
})

async function getData(name) {
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=b250a5a570bcb629df01d0612c90f776&units=metric`

    let response = await fetch(URL);
    let data = await response.json();
    if(data.cod == 404) {
        document.querySelector(".weather").style.display = 'none';
        document.querySelector('.error').style.display = 'block';
    }

    else {
        document.querySelector(".weather").style.display = 'flex';
        document.querySelector(".error").style.display = 'none';

        change_img(data);
        change_values(data);
    }
}

function change_img(data) {
    const weather_type = (data.weather[0].main).toLowerCase();
    console.log(weather_type);

    if(weather_type == 'clouds') {
        weather_type_img.innerHTML = `<img src = './images/clouds.png' alt = 'click again'>`
    }

    else if(weather_type == 'clear') {
        weather_type_img.innerHTML = `<img src = './images/clear.png' alt = 'click again'>`
    }
    else if(weather_type == 'drizzle') {
        weather_type_img.innerHTML = `<img src = './images/drizzle.png' alt = 'click again'>`
    }
    else if(weather_type == 'mist') {
        weather_type_img.innerHTML = `<img src = './images/mist.png' alt = 'click again'>`
    }
    else if(weather_type == 'rain') {
        weather_type_img.innerHTML = `<img src = './images/rain.png' alt = 'click again'>`
    }
    else if(weather_type == 'snow') {
        weather_type_img.innerHTML = `<img src = './images/snow.png' alt = 'click again'>`
    } 

    return;
}

function change_values(data) {
    let temp = data.main.temp;
    let humidity_value = data.main.humidity;
    let wind_speed_value = data.wind.speed;
    let name = data.name;
    temp_value.textContent = `${temp.toFixed(1)}°C`
    humidity.textContent = `${humidity_value}%`
    wind_speed.textContent = `${wind_speed_value}km/h`;
    city_name.textContent = `${name}`; 
    return;  
}

