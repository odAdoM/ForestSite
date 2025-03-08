'use strict';

import * as cc from './add/console-colors.min.js';
import * as helper from './add/helper.min.js';
import * as mnavi from './mobi-navi.min.js';

//=================================================< MENU&NAV >====================================================================

const ROOT = document.querySelector(':root');
const BODY = document.body;

const MENU_HEIGHT = 105;
const MENU_HEIGHT_MOBILE = 80;
const MENU_HEIGHT_MINI = 65;
let actualMenuHeight = MENU_HEIGHT;
//ROOT.style.setProperty('--menu-height', `${actualMenuHeight}px`);

const HOME_HASH = '#home';
const HOME = 'home';
const SCROLLING_BLOCKAGE_TIME = 1500;

const logoHomeBtn = document.querySelector('.logo');
const logoHomeBtn__p = logoHomeBtn.querySelector('p');
const logoHomeBtn__img = logoHomeBtn.querySelector('img');
const header = document.querySelector('.header');

const navMenuItems = document.querySelectorAll('.nav-menu--desktop .nav-menu__item .nav-menu__link[href^="#"]');
const homeNavMenuItem = document.querySelector('.nav-menu--desktop .nav-menu__item#homeItem .nav-menu__link');
const contactNavMenuItem = document.querySelector('.nav-menu--desktop .nav-menu__item#contactItem .nav-menu__link');
const offerNavMenuItem = document.querySelector('.nav-menu--desktop .nav-menu__item#offerItem .nav-menu__link');

let isScrolling = false;
let scrollingTO;
let currentSelectedNavMenuItem;
let currentHash = '';
let activeSection = null;
let fromTop = 0;
let actualScrollY = 0;
let hrefLink = '';
let allHashSections;

//-
const mediaQuery960 = window.matchMedia('(min-width: 960px)');
//-

//============================================================================================================================================================

export function settingsFromIndex(hashsections) {
	///*
	allHashSections = hashsections;
	let hash = helper.checkActualHashLocation();
	//console.log('%c@@@ settingsFromIndex', cc.colors.red);
	//console.log('%clocation: ' + window.location.href + ' %c hash: ' + hash, cc.bgc.green, cc.bgc.purple);

	if (hash === null || hash === HOME) selectThisLinkByItem(homeNavMenuItem);
	else selectThisLinkByHref(hash);

	logoHomeBtn.addEventListener('click', logoClickHandler);
	addListenersToNavMenuLinks();
	window.addEventListener('scroll', updateActiveMenu);
	mediaQuery960.addEventListener('change', mobileViewChangeHandler);
	mobileViewChangeHandler(mediaQuery960); //TODO: czy ustawianie setMenuHeight bez ustawienia actualScroll dziala dobrze? moze trzeba tutaj wywoałć updateActiveMenu?

	// */
}
export function settingsFromContact() {
	// console.log('%c@@@ settingsFromContact', cc.colors.green);
	selectThisLinkByItem(contactNavMenuItem);
	logoHomeBtn.addEventListener('click', logoClickHandlerWithoutScrollSpy);
	mediaQuery960.addEventListener('change', mobileViewChangeHandler);
	mobileViewChangeHandler(mediaQuery960);
}

export function settingsFromOffers() {
	// console.log('%c@@@ settingsFromOffers', cc.colors.teal);
	selectThisLinkByItem(offerNavMenuItem);
	logoHomeBtn.addEventListener('click', logoClickHandlerWithoutScrollSpy);
	mediaQuery960.addEventListener('change', mobileViewChangeHandler);
	mobileViewChangeHandler(mediaQuery960);
}

//============================================================================================================================================================

function updateActiveMenu() {
	actualScrollY = window.scrollY;
	setMenuHeight();
	if (isScrolling) return;

	if (!mnavi.isMobileMenuOn());
	{
		//console.log('%cinside update menu', cc.bgc.blue);
		fromTop = actualScrollY + actualMenuHeight;
		activeSection = null;
		currentHash = currentSelectedNavMenuItem.getAttribute('href').substring(1);
		//console.log('curentHash', currentHash, currentSelectedNavMenuItem);

		allHashSections.forEach((section) => {
			if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
				activeSection = section.id;
				//console.log('%cactive section: ' + activeSection, cc.bgc.yellow);
			}
		});

		if (activeSection !== currentHash) {
			//console.log('%c >> ', cc.bgc.green, activeSection);
			selectThisLinkByHref(activeSection);
		}
	}
}

function setMenuHeight(isHomeFORCE = false) {
	let isHome = isHomeFORCE ? true : currentHash === HOME ? true : false;
	//console.log(`%cisHome? ${isHome}`, cc.bgc.red, currentHash);

	if (!mnavi.isMobileMenuOn()) {
		if (actualScrollY > actualMenuHeight + 800 && !isHome) {
			actualMenuHeight = MENU_HEIGHT_MINI;
		} else {
			// console.log(`%c is mobile?%c ${navi.isMobileOn()}`, cc.colors.orange, cc.bgc.teal);

			actualMenuHeight = mnavi.isMobileOn() ? MENU_HEIGHT_MOBILE : MENU_HEIGHT;
		}
		//console.log('%c actualMenuHeight', cc.bgc.orange, actualMenuHeight);
		ROOT.style.setProperty('--menu-height', `${actualMenuHeight}px`);
	}
}

const selectThisLinkByHref = (hrefName) => {
	//console.log('select link by href: ', hrefName);
	navMenuItems.forEach((link) => {
		hrefLink = link.getAttribute('href').substring(1);

		if (hrefLink === hrefName) {
			selectThisLinkByItem(link);
			return;
		}
	});
};

const deselectNavMenu = () => {
	navMenuItems.forEach((link) => {
		link.classList.remove('active');
	});
	currentSelectedNavMenuItem = '';
	currentHash = '';
};

const selectThisLinkByItem = (link) => {
	if (link) {
		deselectNavMenu();

		link.classList.add('active');
		currentSelectedNavMenuItem = link;
		currentHash = currentSelectedNavMenuItem.getAttribute('href').substring(1);
	}
};

const navLinkHandler = (e) => {
	console.log('%c navi cliked', cc.colors.orange, 'isScrolling: ', isScrolling, 'scrollingTO: ', scrollingTO);
	clearTimeout(scrollingTO);
	isScrolling = true;

	//-
	selectThisLinkByItem(e.target);
	setMenuHeight(e.target.getAttribute('href') === HOME_HASH);
	//-

	scrollingTO = setTimeout(() => {
		isScrolling = false;
	}, SCROLLING_BLOCKAGE_TIME);
};

const addListenersToNavMenuLinks = () => {
	if (navMenuItems && navMenuItems.length > 0) {
		navMenuItems.forEach((link) => {
			link.addEventListener('click', navLinkHandler);
		});
	}
};

const logoClickHandler = (e) => {
	console.log('logo click handler', document.body.id);
	if (mnavi.isMobileMenuOn()) {
		console.log('%cnavi mobile on!', cc.bgc.red);
		e.preventDefault();
	} else {
		//console.log('logo clicked.');
		clearTimeout(scrollingTO);
		isScrolling = true;

		//-
		selectThisLinkByItem(homeNavMenuItem);
		setMenuHeight(true);
		//-

		scrollingTO = setTimeout(() => {
			isScrolling = false;
		}, SCROLLING_BLOCKAGE_TIME);
	}
};

const logoClickHandlerWithoutScrollSpy = (e) => {
	console.log('logo click handler', document.body.id);
	if (mnavi.isMobileMenuOn()) {
		console.log('%cnavi mobile on!', cc.bgc.red);
		e.preventDefault();
	}
};

//TODO: on dom loaded -> run!
//==> go!
// addToMenuItemsHoverTrees();

function mobileViewChangeHandler(e) {
	let isMobileView = !e.matches;
	//console.log('%c ismobile? ' + isMobileView, cc.bgc.orange);

	if (isMobileView) {
		//TODO: zostawić jednak animację?
		logoHomeBtn__p.classList.remove('anim');
		logoHomeBtn__img.classList.remove('anim');
		header.classList.remove('anim');
	} else {
		logoHomeBtn__p.classList.add('anim');
		logoHomeBtn__img.classList.add('anim');
		header.classList.add('anim');
	}
	setMenuHeight();
}

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//TODO: tmp
const addToMenuItemsHoverTrees = () => {
	let template = document.querySelector('#template-contact-trees');
	let newItem = template.content.cloneNode(true);
	navMenuItems[3].appendChild(newItem);

	template = document.querySelector('#template-aboutus-trees');
	newItem = template.content.cloneNode(true);
	navMenuItems[2].appendChild(newItem);
};
// ***
