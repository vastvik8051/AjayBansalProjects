const swiper = new Swiper(".heroSwiper", {

    loop: true,

    speed: 2000,

    autoplay: {
        delay: 5000,
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