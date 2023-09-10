import Swiper from 'swiper';

const swiperController = () => {
    const addDailyForecastSwiper = () => {
        return new Swiper('.swiper-daily', {
            slidesPerView: 1,
            spaceBetween: 10,
            breakpoints: {
                '@0.00': {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                '@0.35': {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                '@0.50': {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            },
        });
    };

    return {
        addDailyForecastSwiper,
    };
};

export default swiperController();
