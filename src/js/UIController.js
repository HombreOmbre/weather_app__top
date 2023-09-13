import format from 'date-fns/format';
import APIController from './APIController';
import swiperController from './swiperController';

const UIController = () => {
    const showCityName = (cityName) => {
        const cityNameElem = document.querySelector(
            '.weather-info__city-icon-box__city',
        );

        cityNameElem.textContent = cityName;
    };

    const showWeatherImg = (iconUrl, iconName) => {
        const imgOfWeather = document.querySelector(
            '.weather-info__city-icon-box__icon',
        );

        imgOfWeather.src = `http:${iconUrl}`;
        imgOfWeather.alt = `${iconName} icon`;
    };

    const showWeatherDescription = (weatherDescription) => {
        const weatherDescriptionElem = document.querySelector(
            '.weather-info__description',
        );

        weatherDescriptionElem.textContent = `${weatherDescription}`;
    };

    const showTempInfo = (temp, isImperial) => {
        const dailyTempElem = document.querySelector('.weather-info__temp');

        if (isImperial) {
            dailyTempElem.textContent = `${temp} °F`;
        } else {
            dailyTempElem.textContent = `${temp} °C`;
        }
    };

    const showTodaysDataAndTime = (localTime) => {
        const todaysDate = new Date(localTime);
        const dateElem = document.querySelector('.weather-info__date');
        const timeElem = document.querySelector('.weather-info__time');

        dateElem.textContent = format(todaysDate, 'PPPP');

        timeElem.textContent = format(todaysDate, 'p');
    };

    const showFeelsLikeTemp = (feelsLikeTemp, isImperial) => {
        const feelsLikeTempElem = document.querySelector('.feels_like_temp');

        if (isImperial) {
            feelsLikeTempElem.textContent = `${feelsLikeTemp} °F`;
        } else {
            feelsLikeTempElem.textContent = `${feelsLikeTemp} °C`;
        }
    };

    const showHumidityPercentage = (humidityPercentage) => {
        const humidityPercentageElem = document.querySelector('.humidity');

        humidityPercentageElem.textContent = `${humidityPercentage} %`;
    };

    const showPressure = (pressureLevel, isImperial) => {
        const pressureElem = document.querySelector('.pressure');

        if (isImperial) {
            pressureElem.textContent = `${pressureLevel} in`;
        } else {
            pressureElem.textContent = `${pressureLevel} hPa`;
        }
    };

    const showWindSpeed = (windSpeed, isImperial) => {
        const windSpeedElem = document.querySelector('.wind-speed');

        if (isImperial) {
            windSpeedElem.textContent = `${windSpeed} mph`;
        } else {
            windSpeedElem.textContent = `${windSpeed} km/h`;
        }
    };

    const renderCurrentWeatherData = (weatherCurrentData) => {
        const tempToggle = document.querySelector('.checkbox');

        showCityName(weatherCurrentData.location.name);
        showWeatherImg(
            weatherCurrentData.current.condition.icon,
            weatherCurrentData.current.condition.text,
        );
        showWeatherDescription(weatherCurrentData.current.condition.text);
        showTempInfo(
            tempToggle.checked === true
                ? weatherCurrentData.current.temp_f
                : weatherCurrentData.current.temp_c,
            tempToggle.checked,
        );
        showTodaysDataAndTime(weatherCurrentData.location.localtime);
        showFeelsLikeTemp(
            tempToggle.checked === true
                ? weatherCurrentData.current.feelslike_f
                : weatherCurrentData.current.feelslike_c,
            tempToggle.checked,
        );
        showHumidityPercentage(weatherCurrentData.current.humidity);
        showPressure(
            tempToggle.checked === true
                ? weatherCurrentData.current.pressure_in
                : weatherCurrentData.current.pressure_mb,
            tempToggle.checked,
        );
        showWindSpeed(
            tempToggle.checked === true
                ? weatherCurrentData.current.wind_mph
                : weatherCurrentData.current.wind_kph,
            tempToggle.checked,
        );

        return weatherCurrentData.forecast.forecastday;
    };

    // Render daily forecast
    const renderDailyForecast = (dailyForecast) => {
        const tempToggle = document.querySelector('.checkbox').checked;
        const forecastDailySwiper = document.querySelector(
            '.forecast-daily-swiper__wrapper',
        );

        forecastDailySwiper.innerHTML = '';

        dailyForecast.forEach((item) => {
            forecastDailySwiper.innerHTML += `
                <div class="swiper-slide forecast-daily-swiper__wrapper__item">
                    <img class="forecast-daily-swiper__wrapper__item__icon" src="http:${
                        item.day.condition.icon
                    }" alt="${item.day.condition.text} icon">
                    <p class="forecast-daily-swiper__wrapper__item__main-temp">${
                        tempToggle === true
                            ? `${item.day.avgtemp_f} °F`
                            : `${item.day.avgtemp_c} °C`
                    }</p>
                    <p class="forecast-daily-swiper__wrapper__item__describe">${
                        item.day.condition.text
                    }</p>
                    <div class="forecast-daily-swiper__wrapper__item__temp-container">
                        <p class="forecast-daily-swiper__wrapper__item__temp-container__temp temp-high">${
                            tempToggle === true
                                ? `H : ${`${item.day.maxtemp_f} °F`}`
                                : `H : ${`${item.day.maxtemp_c} °C`}`
                        }</p>
                        <p class="forecast-daily-swiper__wrapper__item__temp-container__temp temp-low">${
                            tempToggle === true
                                ? `L : ${`${item.day.mintemp_f} °F`}`
                                : `L : ${`${item.day.mintemp_c} °C`}`
                        }</p>
                    </div>
                    <p class="forecast-daily-swiper__wrapper__item__week-day">${format(
                        new Date(item.date),
                        'EEEE',
                    )}</p>
                    <p class="forecast-daily-swiper__wrapper__item__date">${format(
                        new Date(item.date),
                        'PPP',
                    )}</p>
                </div>
            `;
        });

        swiperController.addDailyForecastSwiper();

        return dailyForecast[0].hour;
    };

    const renderHourlyForecast = (hourlyForecast) => {
        const tempToggle = document.querySelector('.checkbox').checked;
        const forecastHourlySwiper = document.querySelector(
            '.forecast-hourly-swiper__wrapper',
        );

        forecastHourlySwiper.innerHTML = '';

        hourlyForecast.forEach((item) => {
            forecastHourlySwiper.innerHTML += `
                <div class="swiper-slide forecast-hourly-swiper__wrapper__item">
                    <p class="forecast-hourly-swiper__wrapper__item__hour">${format(
                        new Date(item.time),
                        'p',
                    )}</p>
                    <img src="http:${item.condition.icon}" alt="${
                        item.condition.text
                    } icon" class="forecast-hourly-swiper__wrapper__item__icon"></img>
                    <p class="forecast-hourly-swiper__wrapper__item__describe">${
                        item.condition.text
                    }</p>
                    <p class="forecast-hourly-swiper__wrapper__item__temp">${
                        tempToggle === true
                            ? `${`${item.temp_f} °F`}`
                            : `${`${item.temp_c} °C`}`
                    }</p>
                </div>
            `;
        });

        swiperController.addHourlyForecastSwiper();
    };

    const manageWeatherData = () => {
        const forecastData = APIController.getDailyAndForecastData();

        forecastData
            .then((data) => renderCurrentWeatherData(data))
            .then((data) => renderDailyForecast(data))
            .then((data) => renderHourlyForecast(data));
    };

    // Datalist for search box
    const renderDatalistForSearchBox = (matchingData) => {
        const datalistForSearchBox = document.querySelector('#matching-data');

        datalistForSearchBox.innerHTML = '';

        matchingData.forEach((item) => {
            datalistForSearchBox.innerHTML += `
                <option value='${item.name}'></option>
            `;
        });
    };

    const manageSearchDatalist = (e) => {
        if (e.target.value.length >= 3) {
            const dataForDataList =
                APIController.getMatchingDataForAutocomplete(e.target.value);

            dataForDataList.then((data) => renderDatalistForSearchBox(data));
        }
    };

    const clearSearchBoxAndDatalist = () => {
        const searchBoxInput = document.querySelector('.search-box__input');
        const searchBoxDatalist = document.querySelector('#matching-data');

        searchBoxInput.value = '';
        searchBoxDatalist.innerHTML = '';
    };

    const handleSearchInputValue = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            APIController.changeCurrentLocation(e.target.value.trim());
            manageWeatherData();
            clearSearchBoxAndDatalist();
        } else if (
            e.target.classList[0] === 'search-box__search-btn' ||
            e.target.classList[0] === 'fa-solid'
        ) {
            APIController.changeCurrentLocation(
                document.querySelector('#search-box').value.trim(),
            );
            manageWeatherData();
            clearSearchBoxAndDatalist();
        }
    };

    const changeUnits = () => {
        const currentLocation = APIController.getCurrentLocationData();

        renderCurrentWeatherData(currentLocation);
        renderDailyForecast(currentLocation.forecast.forecastday);
        renderHourlyForecast(currentLocation.forecast.forecastday[0].hour);
    };

    const toggleBetweenDailyAndHourly = () => {
        const dailyForecast = document.querySelector('.swiper-daily');
        const hourlyForecast = document.querySelector('.swiper-hourly');

        dailyForecast.classList.toggle('active');
        hourlyForecast.classList.toggle('active');
    };

    const addEventListenersToThePage = () => {
        const searchBoxSubmitBtn = document.querySelector(
            '.search-box__search-btn',
        );
        const searchBoxInput = document.querySelector('.search-box__input');
        const tempToggle = document.querySelector('.checkbox');
        const dailyHourlyToggle = document.querySelector('.checkbox-forecast');

        searchBoxInput.addEventListener('input', manageSearchDatalist);
        searchBoxSubmitBtn.addEventListener('click', handleSearchInputValue);
        searchBoxInput.addEventListener('keypress', handleSearchInputValue);
        tempToggle.addEventListener('change', changeUnits);
        dailyHourlyToggle.addEventListener(
            'change',
            toggleBetweenDailyAndHourly,
        );
    };

    const renderWeatherInfoAndAddEventListeners = () => {
        manageWeatherData();
        addEventListenersToThePage();
    };

    return {
        renderWeatherInfoAndAddEventListeners,
    };
};

export default UIController();
