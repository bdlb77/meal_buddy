import '../sass/style.scss';
// allow for easier use of querySelector and querySelectorAll
// credits to WesBos!
import { $, $$ } from './modules/bling';
import navbar from './modules/navbar';
import makeMap from './modules/map';
// import formModal from './modules/formModal';
import reviewFormAnimate from './modules/reviewFormAnimate';
import eventSwipe from './modules/eventsSwipe';
const navMenu = $('.nav__dropdown');
navMenu.on('click', navbar);
makeMap($('#map'));
// if (formModal) {
// 	formModal();
// }
reviewFormAnimate();

let arrowRight = document.querySelector('.fas.fa-angle-double-right');
let arrowLeft = document.querySelector('.fas.fa-angle-double-left');

if (arrowRight && arrowLeft) eventSwipe();
