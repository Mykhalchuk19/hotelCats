import '../styles/basic.sass';

const backgroundBody = document.getElementById('js-bg-body');
const buttonsArmor = document.querySelectorAll('.js-btn-pop-up');
const booking = document.getElementById('js-booking-pop-up');
const thank = document.getElementById('js-thank-pop-up');
const btnClose = document.querySelectorAll('.js-close-pop-up');
const btnSubmit = document.getElementById('js-btn-submit-booking');
const btnOkey = document.getElementById('js-btn-close-thank');


function findBgSize() {
  backgroundBody.style.height = `${document.body.scrollHeight}px`;
backgroundBody.style.width = `${document.body.scrollWidth}px`;
}


function visibleBooking(){
  findBgSize();
  booking.style.top = `${window.pageYOffset + 40}px`;
  backgroundBody.style.display = 'block';
  booking.style.display = 'block';
}

function HideForm() {
  backgroundBody.style.display = 'none';
  this.parentElement.style.display = 'none';
}

function submitBooking(event) {
  event.preventDefault();
  booking.style.display = 'none';
  thank.style.top = `${window.pageYOffset + 40}px`;
  thank.style.display = 'block';
}

function completeBooking() {
  thank.style.display = 'none';
  backgroundBody.style.display = 'none';
}

window.addEventListener('resize', findBgSize);
btnSubmit.addEventListener('click', submitBooking);
btnOkey.addEventListener('click', completeBooking);
buttonsArmor.forEach((btn)=>{
  btn.addEventListener('click', visibleBooking);
});
btnClose.forEach((btn)=>{
  btn.addEventListener('click', HideForm);
});



require('slick-carousel');
require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');
require('slick-carousel/slick/ajax-loader.gif');
const $ = require('jquery');
$('.room__slider').slick({
  dots: true,
  arrows: false,
  dotsClass: 'slick-dots slider__dots',
  cssEase: 'ease-in-out',
});

$('.recall__slider').slick({
  dots: true,
  arrows: false,
  dotsClass: 'slick-dots slider__dots',
  cssEase: 'ease-in-out',
  adaptiveHeight: true,
  slidesToShow: 1,
});

