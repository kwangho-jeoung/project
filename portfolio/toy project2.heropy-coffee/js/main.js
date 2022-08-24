const searchEl = document.querySelector('.search');
const searchinputEl = searchEl.querySelector('input');
searchEl.addEventListener('click', function(){
    searchinputEl.focus();
});
//input 내부요소에 포커스 되면 실행
searchinputEl.addEventListener('focus', function(){
    searchEl.classList.add('focused');
    searchinputEl.setAttribute('placeholder', '통합검색' );
});

//검색창 내부요소에 포커스가 해제되면 실행
searchinputEl.addEventListener('blur', function(){
    searchEl.classList.remove('focused');
    searchinputEl.setAttribute('placeholder', '' );
});

//페이지 스크롤에 따른 요소 제어
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', function(){
    console.log(window.scrollY);
    if(window.scrollY>500){
        gsap.to(badgeEl, .6, {
            opacity:0,
            display:'none'
        });
        //상단으로 이동 버튼 보이기!!
        gsap.to(toTopEl, .6,{
            opacity:1,
            x:0
        });
    }else{
        //Badge 요소 보이기
        gsap.to(badgeEl, .6, {
            opacity:1,
            display:'block'
        });  
        //상단으로 이동 버튼 숨기기!
        gsap.to(toTopEl, .6, {
            opacity:0,
            x:100
        });
    }
});

//나타날 요소(.fade-in)들을 찾기
const fadeEls = document.querySelectorAll('.visual .fade-in');
//요소들을 하나씩 반복해서 처리
fadeEls.forEach(function(fadeEl, index){
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7,
        opacity:1
    });
});

new Swiper('.notice .swiper', {
    direction:'vertical',
    autoplay:true,
    loop:true
});

new Swiper('.promotion .swiper', {
    autoplay:true,
    loop:true,
    slidesPerView:3,
    spaceBetween:10,
    centeredSlides:true,
    pagination:{
        el:'.promotion .swiper-pagination',
        clickable:true
    },
    navigation:{
        prevEl:'.promotion .swiper-button-prev',
        nextEl:'.promotion .swiper-button-next'
    }
});

const promotionEl = document.querySelector('section.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
//토글 버튼을 클릭했을 때.
promotionToggleBtn.addEventListener('click', function(){
    if(promotionEl.classList.contains('hide')){
        promotionEl.classList.remove('hide');
    }else{
        promotionEl.classList.add('hide');
    }
});

gsap.to('.floating1', 1.5, {
    delay:1,
    y:15,
    repeat:-1,
    yoyo:true,
    ease:Power1.easeInOut
});

gsap.to('.floating2', 2, {
    delay:5,
    y:15,
    repeat:-1,
    yoyo:true,
    ease:Power1.easeInOut
});

gsap.to('.floating3', 2.5, {
    delay:1.5,
    y:20,
    repeat:-1,
    yoyo:true,
    ease:Power1.easeInOut
});

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl){
    new ScrollMagic
        .Scene({
            triggerElement: spyEl,
            triggerHook: .8
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});

new Swiper('.awards .swiper', {
    autoplay:true,
    loop:true,
    spaceBetween:30,
    slidesPerView:5,
    navigation:{
        prevEl:'.awards .swiper-button-prev',
        nextEl:'.awards .swiper-button-next'
    }
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();

//하단 바 클릭했을 때 홈페이지 최상단 이동!!
toTopEl.addEventListener('click', function(){
    gsap.to(window, 1.9,{
        scrollTo:0
    });
});