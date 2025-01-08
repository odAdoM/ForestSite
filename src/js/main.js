'use strict';

//=================================================< MENU&NAV >====================================================================
// ---
// MENU - listeners, active state
// ---
const HOME_HASH = '#home';

const nav = document.querySelector('.nav');
const navMenuItems = document.querySelectorAll('.nav-menu__item');
const homeNavMenuItem = document.querySelector('.nav-menu__item#homeLink');
let currentSelectedItem;

// jaki inny sposób na "wyciszenie" scrollHandlera na czas scrollTo po kliku na menu?
const navLinkHandler = (e) => {
	const current = e.target.closest('.nav-menu__item');
	window.removeEventListener('scroll', scrollHandler);
	//-
	selectThisLinkByItem(current);
	setMenuHeight(e.target.getAttribute('href') === HOME_HASH); // set normal menu height if is home section
	//-
	setTimeout(() => {
		window.addEventListener('scroll', scrollHandler);
	}, 1500);
};

const selectThisLinkByItem = (goal) => {
	if (goal) {
		deselectNavMenu();
		goal.classList.add('nav-active');
		currentSelectedItem = goal;
	}
};

const deselectNavMenu = () => {
	navMenuItems.forEach((link) => {
		link.classList.remove('nav-active');
	});
	currentSelectedItem = '';
};

let hrefLink = '';
let linkA;
const selectThisLinkByHref = (hrefName) => {
	navMenuItems.forEach((link) => {
		linkA = link.querySelector('a');
		hrefLink = linkA.getAttribute('href');
		if (hrefLink.startsWith('#')) hrefLink = hrefLink.slice(1);

		//console.log('selectThisLinkByHref: ', hrefLink, hrefName);
		if (hrefLink === hrefName) {
			//console.log('>>>> ', hrefLink, linkA);
			selectThisLinkByItem(link);
			return;
		}
	});
};

const addListenersToNavMenuLinks = () => {
	if (navMenuItems && navMenuItems.length > 0) {
		navMenuItems.forEach((link) => {
			link.addEventListener('click', navLinkHandler);
		});
	}
};
const addToMenuItemsHoverTrees = () => {
	let template = document.querySelector('#template-contact-trees');
	let newItem = template.content.cloneNode(true);
	navMenuItems[3].appendChild(newItem);

	template = document.querySelector('#template-aboutus-trees');
	newItem = template.content.cloneNode(true);
	navMenuItems[2].appendChild(newItem);
};

// ***
// hash sections helps by scroll spy
let currentSection;
let currentHash;
const MENU_HEIGHT = 105;
const MENU_HEIGHT_MINI = 65;
const root = document.querySelector(':root');
let actualMenuHeight = MENU_HEIGHT;
root.style.setProperty('--menu-height--desktop', `${actualMenuHeight}px`);
// let actualMenuHeight = getComputedStyle(document.documentElement).getPropertyValue('--menu-height--desktop').slice(0, -2);

const allHashSections = document.querySelectorAll('.hash-section');

const scrollHandler = () => {
	currentSection = window.scrollY;
	currentHash = currentSelectedItem.querySelector('a').getAttribute('href');
	if (currentHash.startsWith('#')) currentHash = currentHash.slice(1);

	//console.log(window.location.hash);
	//console.log((currentSection));

	allHashSections.forEach((section) => {
		//console.log(currentSection);
		if (
			currentSection > section.offsetTop - actualMenuHeight &&
			currentSection < section.offsetTop + section.offsetHeight - actualMenuHeight
		) {
			console.log(section.className + ' ' + 'start: ' + section.offsetTop + ' plus: ' + section.offsetHeight);
			// console.log('current selected: ', currentHash, ' ? ', section.id);

			if (currentHash !== section.id) {
				console.log('>> do select', section.id, actualMenuHeight);
				selectThisLinkByHref(section.id);
				return;
			}
		}
	});

	//==

	setMenuHeight();
};

const setMenuHeight = (isHome = false) => {
	if (currentSection > nav.offsetHeight + 200 && !isHome) {
		actualMenuHeight = MENU_HEIGHT_MINI;
	} else {
		actualMenuHeight = MENU_HEIGHT;
	}
	root.style.setProperty('--menu-height--desktop', `${actualMenuHeight}px`);
};

//==> go!
addToMenuItemsHoverTrees();
selectThisLinkByItem(homeNavMenuItem);
addListenersToNavMenuLinks();
window.addEventListener('scroll', scrollHandler);

//=================================================< OFFER >====================================================================
// OFFER - appropriate icons setting
// ---

const POSITIVE_ICON = 'fa-solid fa-check';
const NEGTIVE_ICON = 'fa-solid fa-minus';

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
			ico.innerHTML = `<i class="${POSITIVE_ICON}"></i>`;
		} else if (ico.classList.contains('i_neg')) {
			ico.innerHTML = `<i class="${NEGTIVE_ICON}"></i>`;
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
				next = getRandomInt(offerAmount);
			} while (next === prev);
		} else next = getRandomInt(offerAmount);

		newDelay = 0;
		const box = offerBoxes[next];
		if (box) {
			if (!box.matches(':hover')) box.classList.add('gradient-animation');

			prev = next;
			newDelay = getRandomInteger(4, 5) * 1000;
		}

		offerRandomAnimation(newDelay);
	}, delay);
};

//==> go!
setLiIcons();
offerRandomAnimation(1000);
