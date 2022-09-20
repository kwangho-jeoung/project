new Swiper('.main-video .inner .swiper', {
    autoplay:true,
    loop:true,
    slidesPerView:3,
    spaceBetween:10,
    navigation:{
        prevEl:'.main-video .inner .swiper-button-prev',
        nextEl:'.main-video .inner .swiper-button-next'
    }
});