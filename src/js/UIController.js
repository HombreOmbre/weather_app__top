import format from 'date-fns/format';
import APIController from './APIController';

const UIController = () => {
    const showCityName = (cityName) => {
        const cityNameElem = document.querySelector(
            '.weather-info__city-icon-box__city',
        );

        cityNameElem.textContent = cityName;
    };

    const showWeatherImg = (dataForIconAndDescription) => {
        const imgOfWeather = document.querySelector(
            '.weather-info__city-icon-box__icon',
        );

        imgOfWeather.src = `https://openweathermap.org/img/wn/${dataForIconAndDescription.icon}@2x.png`;
        imgOfWeather.alt = dataForIconAndDescription.main;
    };

    const showWeatherDescription = (weatherDescription) => {
        const weatherDescriptionElem = document.querySelector(
            '.weather-info__description',
        );
        const description = weatherDescription.split(' ');
        const weatherDescriptionWithCapitalize = [];

        if (description.length > 1) {
            for (let i = 0; i < description.length; i++) {
                weatherDescriptionWithCapitalize.push(
                    description[i].slice(0, 1).toUpperCase() +
                        description[i].slice(1).toLowerCase(),
                );
            }
        } else {
            weatherDescriptionWithCapitalize.push(
                description[0].slice(0, 1).toUpperCase() +
                    description[0].slice(1).toLowerCase(),
            );
        }

        weatherDescriptionElem.textContent =
            weatherDescriptionWithCapitalize.join(' ');
    };

    const showTempInfo = (temp, isCelsiusOrFarenheit) => {
        const dailyTempElem = document.querySelector('.weather-info__temp');
        const dailyTemp = Math.round(temp * 100) / 100;
        if (isCelsiusOrFarenheit) {
            dailyTempElem.textContent = `${dailyTemp} °F`;
        } else {
            dailyTempElem.textContent = `${dailyTemp} °C`;
        }
    };

    const showTodaysDataAndTime = () => {
        const todaysDate = new Date();
        const dateElem = document.querySelector('.weather-info__date');
        const timeElem = document.querySelector('.weather-info__time');

        dateElem.textContent = format(todaysDate, 'PPPP');

        timeElem.textContent = format(todaysDate, 'p');
    };

    const showFeelsLikeTemp = (feelsLikeTemp, isCelsiusOrFarenheit) => {
        const feelsLikeTempElem = document.querySelector('.feels_like_temp');

        if (isCelsiusOrFarenheit) {
            feelsLikeTempElem.textContent = `${Math.round(feelsLikeTemp)} °F`;
        } else {
            feelsLikeTempElem.textContent = `${Math.round(feelsLikeTemp)} °C`;
        }
    };

    const showHumidityPercentage = (humidityPercentage) => {
        const humidityPercentageElem = document.querySelector('.humidity');

        humidityPercentageElem.textContent = `${humidityPercentage} %`;
    };

    const showPressure = (pressureLevel) => {
        const pressureElem = document.querySelector('.pressure');

        pressureElem.textContent = `${pressureLevel} hPa`;
    };

    const showWindSpeed = (windSpeed, isMetricOrImperial) => {
        const windSpeedElem = document.querySelector('.wind-speed');

        if (isMetricOrImperial) {
            windSpeedElem.textContent = `${
                Math.round(windSpeed * 100) / 100
            } mph`;
        } else {
            windSpeedElem.textContent = `${
                Math.round(windSpeed * 3.6 * 100) / 100
            } km/h`;
        }
    };

    const showDailyMainData = (weatherData) => {
        const tempToggle = document.querySelector('.checkbox');

        showCityName(weatherData.name);
        showWeatherImg(weatherData.weather[0]);
        showWeatherDescription(weatherData.weather[0].description);
        showTempInfo(weatherData.main.temp, tempToggle.checked);
        showTodaysDataAndTime();
        showFeelsLikeTemp(weatherData.main.feels_like, tempToggle.checked);
        showHumidityPercentage(weatherData.main.humidity);
        showPressure(weatherData.main.pressure);
        showWindSpeed(weatherData.wind.speed, tempToggle.checked);
    };

    async function manageDailyWeatherData() {
        try {
            const dailyWeatherData = APIController.getWeatherData();

            dailyWeatherData.then((data) => showDailyMainData(data));
        } catch (err) {
            console.log(err);
        }
    }

    return {
        manageDailyWeatherData,
    };
};

export default UIController();
