'use strict';

import * as helper from './add/helper.min.js';
import * as cc from './add/console-colors.min.js';
import * as navi from './navi.min.js';
import * as offer from './offer.min.js';

const tdIconsMobile = document.querySelectorAll('.offers-box--mobile .offer-table td span');
const tdIconsDesktop = document.querySelectorAll('.offers-box--desktop .offer-table td span');
const allAddIconsMobile = Array.from(tdIconsMobile).filter((i) => i.classList.contains('i_add'));
const allAddIconsDesktop = Array.from(tdIconsDesktop).filter((i) => i.classList.contains('i_add'));
let allAddIcons = allAddIconsMobile;
let addIconsTO = 0;

//-
const mediaQuery840 = window.matchMedia('(min-width: 840px)');
//-

//====================================================================================

const setIcons = () => {
	// mobile ver

	if (tdIconsMobile && tdIconsMobile.length > 0) {
		tdIconsMobile.forEach((ico) => {
			offer.setRightIcon(ico);
		});
	}
	if (allAddIconsMobile && allAddIconsMobile.length > 0) {
		allAddIconsMobile.forEach((ico) => {
			ico.classList.add('plus-off-animation');
			ico.style.animation = 'none'; //stop at loading page
		});
	}

	// desktop ver

	if (tdIconsDesktop && tdIconsDesktop.length > 0) {
		tdIconsDesktop.forEach((ico) => {
			offer.setRightIcon(ico);
		});
	}
	if (allAddIconsDesktop && allAddIconsDesktop.length > 0) {
		allAddIconsDesktop.forEach((ico) => {
			ico.classList.add('plus-off-animation');
			ico.style.animation = 'none'; //stop at loading page
		});
	}
};

const setAddIconsAnimation = (delay) => {
	clearTimeout(addIconsTO);

	addIconsTO = setTimeout(function () {
		resetAddIcons();
		const getThreeNumbers = helper.getRandomFigures(3, 0, allAddIcons.length - 1);

		setTimeout(function () {
			//console.log('%c start anim', cc.bgc.orange);
			allAddIcons.forEach((ico) => {
				ico.style.animation = ''; // return to animation from class, at start
			});

			getThreeNumbers.forEach((n) => {
				let newIco = document.createElement('span');
				newIco.innerHTML = `<ion-icon name="checkmark-outline"></ion-icon>`;
				newIco.classList.add('new-plus-icon');
				allAddIcons[n].parentNode.appendChild(newIco);
			});

			setAddIconsAnimation(5000);
		}, 10);
	}, delay);
};

const resetAddIcons = () => {
	//console.log('%c clear', cc.colors.green);
	allAddIcons.forEach((ico) => {
		ico.style.animation = 'none';

		const ai = ico.parentNode.querySelector('span.new-plus-icon');
		if (ai != null) {
			ai.remove();
		}
	});
};

//--------

function mobileViewChangeHandler(e) {
	let isMobileView = !e.matches;
	//console.log('is mobile?%c ' + isMobileView, cc.bgc.blue);

	allAddIcons = isMobileView ? allAddIconsMobile : allAddIconsDesktop;
	setAddIconsAnimation(500);
}

//==>
navi.settingsFromOffers();
setIcons();
mediaQuery840.addEventListener('change', mobileViewChangeHandler);
mobileViewChangeHandler(mediaQuery840);
