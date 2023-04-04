import React, {useState} from "react";
import "./Weather.css";


export default function Weather() {
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [weatherData, setWeather] = useState<any>({});
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    const getWeatherData = async (position: any | undefined) => {
        let temp = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+
            "&appid=314fa0f6b4b949c41a68b37042ac898f", {method: 'GET'}).then(result => result.json())
        setWeather(temp);
        setDataLoaded(true);
    }

    const getCurrentLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeatherData);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    const kelvinToFarenheit = (k: any | undefined) => {
        return (((k-273.15)*1.8)+32).toFixed(0);
    };

    const initializeData = async () => {
        //initializes the weather with the current location
        await getCurrentLocation();
    }

    if(!dataLoaded) initializeData();

    if (dataLoaded){
        return (
            <article className="widget">
                <div className="weatherIcon"></div>
                <div className="weatherData">
                    <h1 className="weatherTemp">
                        {kelvinToFarenheit(weatherData.main.temp)}&deg; F
                    </h1>
                    <h2 className="weatherDesc">{weatherData.weather[0].main}</h2>
                    <h3 className="weatherLoc">{weatherData.name}</h3>
                </div>
                <div className="date">
                    <h4 className="weatherMonth">{monthNames[currentDate.getMonth()]}</h4>
                    <h5 className="weatherDay">{currentDate.getDate()}</h5>
                </div>
            </article>
        )
    } else {
        return (
            <div className="weather">

            </div>
        )
    }
};