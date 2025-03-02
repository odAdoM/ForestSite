'use strict';

import * as helper from './helper.min.js';
import * as cc from './console-colors.min.js';

const asideText = document.querySelector('.aside-adventure__text');
const ASIDE_TEXT = asideText.innerHTML;

const setAsideText = (e) => {
	if (e.matches) {
		asideText.innerHTML = helper.insertHardSpaceBetweenLastTwoWords(ASIDE_TEXT);
	} else {
		asideText.innerHTML = ASIDE_TEXT;
	}
	// console.log('actual text:', asideText.innerHTML);
};
const mediaQuery400 = window.matchMedia('(min-width: 400px)'); //todo
mediaQuery400.addEventListener('change', setAsideText);
setAsideText(mediaQuery400);

//--

const aside = document.querySelector('.aside-adventure');
const ASIDE_DEFAULT_SCALE_X = getComputedStyle(aside).getPropertyValue('--scaleX');
const ASIDE_DEFAULT_SCALE_Y = getComputedStyle(aside).getPropertyValue('--scaleY');

const changeScaleAnimation = (e) => {
	if (e.matches) {
		aside.style.setProperty('--scaleX', ASIDE_DEFAULT_SCALE_X);
		aside.style.setProperty('--scaleY', ASIDE_DEFAULT_SCALE_Y);
	} else {
		aside.style.setProperty('--scaleX', '1.2');
		aside.style.setProperty('--scaleY', '1.5');
	}
};
const mediaQuery660 = window.matchMedia('(min-width: 660px)');
mediaQuery660.addEventListener('change', changeScaleAnimation);
changeScaleAnimation(mediaQuery660);
