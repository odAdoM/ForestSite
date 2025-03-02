'use strict';

import * as helper from './helper.min.js';
import * as cc from './console-colors.min.js';

//=================================================< OFFER >====================================================================
// OFFER - appropriate icons setting
// ---

// fontawesome
// const POSITIVE_ICON = 'fa-solid fa-check';
// const NEGTIVE_ICON = 'fa-solid fa-minus';
//tabler
// const POSITIVE_ICON = 'ti ti-check';
// const NEGTIVE_ICON = 'ti ti-minus';
//ionic
const POSITIVE_ICON = 'checkmark';
const NEGTIVE_ICON = 'remove';

const setLiIcons = () => {
	const offerItems = document.querySelectorAll('.offer-boxes__box > ul > li');
	if (offerItems && offerItems.length > 0) {
		offerItems.forEach((li) => {
			setRightIcon(li);
		});
	}
};
const setRightIcon = (li) => {
	const ico = li.querySelector('span');
	if (ico) {
		if (ico.classList.contains('i_pos')) {
			// ico.innerHTML = `<i class="${POSITIVE_ICON}"></i>`;
			ico.innerHTML = `<ion-icon name="${POSITIVE_ICON}"></ion-icon>`;
		} else if (ico.classList.contains('i_neg')) {
			// ico.innerHTML = `<i class="${NEGTIVE_ICON}"></i>`;
			ico.innerHTML = `<ion-icon name="${NEGTIVE_ICON}"></ion-icon>`;
			li.classList.add('i_neg');
		}
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
