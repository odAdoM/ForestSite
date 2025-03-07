'use strict';

import * as helper from './add/helper.min.js';
import * as cc from './add/console-colors.min.js';
import * as navi from './navi.min.js';
import * as offer from './offer.min.js';

const tdIcons = document.querySelectorAll('.offer-table td span');
const allAddIcons = Array.from(tdIcons).filter((i) => i.classList.contains('i_add'));
let addIconsTO = 0;

//====================================================================================

const setIcons = () => {
	if (tdIcons && tdIcons.length > 0) {
		tdIcons.forEach((ico) => {
			offer.setRightIcon(ico);
		});
	}

	if (allAddIcons && allAddIcons.length > 0) {
		allAddIcons.forEach((ico) => {
			ico.classList.add('plus-off-animation');
			ico.style.animation = 'none'; //stop at loading page
		});
	}
};

const setAddIconsAnimation = (delay) => {
	//clearTimeout(addIconsTO);

	addIconsTO = setTimeout(function () {
		resetAddIcons();
		const getThreeNumbers = helper.getRandomFigures(3, 0, allAddIcons.length - 1);

		setTimeout(function () {
			console.log('%c start anim', cc.bgc.orange);
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
	console.log('%c clear', cc.colors.green);
	allAddIcons.forEach((ico) => {
		//ico.style.animationPlayState = 'paused';
		//ico.classList.remove('plus-off-animation');
		ico.style.animation = 'none';

		const ai = ico.parentNode.querySelector('span.new-plus-icon');
		if (ai != null) {
			//console.log(ai);
			//ico.parentNode.removeChild(ai);
			ai.remove();
		}
	});

	// try {

	// console.log(i.classList.contains('new-plus-icon'));
	// const addedIcon = i.parentNode.querySelector('.new-plus-icon');
	// console.log(addedIcon);
	// } catch (error) {
	// console.log("error by removing dynamic icon at offer's table");
	// }
};

//==>
navi.settingsFromOffers();
setIcons();
setAddIconsAnimation(1000);
