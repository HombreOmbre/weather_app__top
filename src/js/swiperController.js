import Swiper from 'swiper';

const swiperController = () => {
    const addDailyForecastSwiper = () => {
        return new Swiper('.swiper-daily', {
            slidesPerView: 1.5,
            spaceBetween: 10,
            breakpoints: {
                450: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                650: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            },
        });
    };

    const addHourlyForecastSwiper = () => {
        return new Swiper('.swiper-hourly', {
            slidesPerView: 2.5,
            spaceBetween: 10,
            breakpoints: {
                350: {
                    slidesPerView: 3.5,
                    spaceBetween: 10,
                },
                450: {
                    slidesPerView: 4.5,
                    spaceBetween: 10,
                },
                550: {
                    slidesPerView: 5.5,
                    spaceBetween: 10,
                },
                650: {
                    slidesPerView: 6.5,
                    spaceBetween: 20,
                },
            },
        });
    };

    return {
        addDailyForecastSwiper,
        addHourlyForecastSwiper,
    };
};

export default swiperController();
