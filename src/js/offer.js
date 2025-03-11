'use strict';

//import * as cc from './add/console-colors.min.js';
import * as helper from './add/helper.min.js';

//=================================================< OFFER >====================================================================

// -- appropriate icons setting

//  > fontawesome
// const POSITIVE_ICON = 'fa-solid fa-check';
// const NEGTIVE_ICON = 'fa-solid fa-minus';

//  > tabler
// const POSITIVE_ICON = 'ti ti-check';
// const NEGTIVE_ICON = 'ti ti-minus';

//  > ionic
const POSITIVE_ICON = 'checkmark-outline';
const NEGTIVE_ICON = 'remove-outline';
const ADD_ICON = 'add-outline';

export function setRightIcon(ico) {
	if (ico) {
		if (ico.classList.contains('i_pos')) {
			// ico.innerHTML = `<i class="${POSITIVE_ICON}"></i>`;
			ico.innerHTML = `<ion-icon name="${POSITIVE_ICON}"></ion-icon>`;
		} else if (ico.classList.contains('i_neg')) {
			// ico.innerHTML = `<i class="${NEGTIVE_ICON}"></i>`;
			ico.innerHTML = `<ion-icon name="${NEGTIVE_ICON}"></ion-icon>`;
		} else if (ico.classList.contains('i_add')) {
			// ico.innerHTML = `<i class="${NEGTIVE_ICON}"></i>`;
			ico.innerHTML = `<ion-icon name="${ADD_ICON}"></ion-icon>`;
		}
	}
}

//=================================================================================================

const setLiIcons = () => {
	const offerItems = document.querySelectorAll('.offer-boxes__box > ul > li span');
	if (offerItems && offerItems.length > 0) {
		offerItems.forEach((i) => {
			setRightIcon(i);
		});
	}
};

// ^^^
// gradient animation - all togheter

const offerBoxes = document.querySelectorAll('.offer-boxes__box');
const offerAmount = offerBoxes.length;

/*
const offerItemsAnimation = () => {
	let delayTime = 0;
	
	offerBoxes.forEach((item) => {
		item.classList.add('gradient-animation');
		item.style.animationDelay = '.' + delayTime + 's';
		item.style.animationIterationCount = 'infinite';
		delayTime += 1400;
		});
		};
		
offerItemsAnimation();
*/

// ^^^
// gradient animation - random on each

let prev = 0;
let ct;
let newDelay = 0;

const offerRandomAnimation = (delay) => {
	clearTimeout(ct);

	//-

	ct = setTimeout(() => {
		offerBoxes.forEach((item) => {
			item.classList.remove('gradient-animation');
		});

		let next;

		if (offerAmount > 2) {
			do {
				next = helper.getRandomInt(offerAmount);
			} while (next === prev);
		} else next = helper.getRandomInt(offerAmount);

		newDelay = 0;
		const box = offerBoxes[next];
		if (box) {
			if (!box.matches(':hover')) box.classList.add('gradient-animation');

			prev = next;
			newDelay = helper.getRandomInteger(4, 5) * 1000;
		}

		offerRandomAnimation(newDelay);
	}, delay);
};

//==> go!
setLiIcons();
offerRandomAnimation(1000);
