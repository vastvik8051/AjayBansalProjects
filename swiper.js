const swiper = new Swiper(".heroSwiper", {

    loop: true,

    speed: 1200,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    effect: "fade",

    fadeEffect: {
        crossFade: true,
    }

});