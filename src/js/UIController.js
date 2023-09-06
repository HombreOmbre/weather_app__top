import format from 'date-fns/format';
import APIController from './APIController';

const UIController = () => {
    let nameOfThePlace = 'Warsaw';

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

        console.log(weatherCurrentData);
    };

    const manageWeatherData = (place) => {
        const cityName = place || nameOfThePlace;

        console.log(cityName);

        const dailyWeatherData = APIController.getCurrentWeatherData(cityName);

        dailyWeatherData.then((data) => renderCurrentWeatherData(data));
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

    const handleSearchInputValue = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            manageWeatherData(e.target.value.trim());
            nameOfThePlace = e.target.value.trim();
        } else if (
            e.target.classList[0] === 'search-box__search-btn' ||
            e.target.classList[0] === 'fa-solid'
        ) {
            manageWeatherData(
                document.querySelector('#search-box').value.trim(),
            );
            nameOfThePlace = document.querySelector('#search-box').value.trim();
        }
    };

    const changeUnits = () => {
        manageWeatherData(nameOfThePlace);
    };

    const addEventListenersToThePage = () => {
        const searchBoxSubmitBtn = document.querySelector(
            '.search-box__search-btn',
        );
        const searchBoxInput = document.querySelector('.search-box__input');
        const tempToggle = document.querySelector('.checkbox');

        searchBoxInput.addEventListener('input', manageSearchDatalist);
        searchBoxSubmitBtn.addEventListener('click', handleSearchInputValue);
        searchBoxInput.addEventListener('keypress', handleSearchInputValue);
        tempToggle.addEventListener('change', changeUnits);
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
