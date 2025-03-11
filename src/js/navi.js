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

const navMenuLinks_hashed = document.querySelectorAll('.nav-menu--desktop .nav-menu__item .nav-menu__link[href^="#"]');
const navMenuLinks = document.querySelectorAll('.nav-menu--desktop .nav-menu__item .nav-menu__link');
const homeNavMenuLink = document.querySelector('.nav-menu--desktop .nav-menu__item#homeItem .nav-menu__link');
const contactNavMenuLink = document.querySelector('.nav-menu--desktop .nav-menu__item#contactItem .nav-menu__link');
const offerNavMenuLink = document.querySelector('.nav-menu--desktop .nav-menu__item#offerItem .nav-menu__link');

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

	if (hash === null || hash === HOME) selectThisLinkByItem(homeNavMenuLink);
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
	selectThisLinkByItem(contactNavMenuLink);
	logoHomeBtn.addEventListener('click', logoClickHandlerWithoutScrollSpy);
	addListenersToNavMenuLinks(true);
	mediaQuery960.addEventListener('change', mobileViewChangeHandler);
	mobileViewChangeHandler(mediaQuery960);
}

export function settingsFromOffers() {
	// console.log('%c@@@ settingsFromOffers', cc.colors.teal);
	selectThisLinkByItem(offerNavMenuLink);
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
	let treesSize;
	//console.log(`%cisHome? ${isHome}`, cc.bgc.red, currentHash);

	if (!mnavi.isMobileMenuOn()) {
		if (actualScrollY > actualMenuHeight + 800 && !isHome) {
			actualMenuHeight = MENU_HEIGHT_MINI;
			treesSize = 3;
		} else {
			// console.log(`%c is mobile?%c ${navi.isMobileOn()}`, cc.colors.orange, cc.bgc.teal);

			actualMenuHeight = mnavi.isMobileOn() ? MENU_HEIGHT_MOBILE : MENU_HEIGHT;
			treesSize = 4;
		}
		//console.log('%c actualMenuHeight', cc.bgc.orange, actualMenuHeight);
		ROOT.style.setProperty('--menu-height', `${actualMenuHeight}px`);
		ROOT.style.setProperty('--size', `${treesSize}px`);
	}
}

const selectThisLinkByHref = (hrefName) => {
	//console.log('select link by href: ', hrefName);
	navMenuLinks_hashed.forEach((link) => {
		hrefLink = link.getAttribute('href').substring(1);

		if (hrefLink === hrefName) {
			selectThisLinkByItem(link);
			return;
		}
	});
};

const deselectNavMenu = () => {
	navMenuLinks_hashed.forEach((link) => {
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

		try {
			link.querySelector('.trees').classList.remove('over-state');
		} catch (error) {
			console.log(error);
		}
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

const addListenersToNavMenuLinks = (onlyHovers = false) => {
	if (!onlyHovers) {
		if (navMenuLinks_hashed && navMenuLinks_hashed.length > 0) {
			navMenuLinks_hashed.forEach((link) => {
				link.addEventListener('click', navLinkHandler);
			});
		}
	}

	if (navMenuLinks && navMenuLinks.length > 0) {
		navMenuLinks.forEach((link) => {
			link.addEventListener('mouseover', (e) => {
				if (!e.target.classList.contains('active')) {
					e.target.querySelector('.trees').classList.add('over-state');
				}
			});
			link.addEventListener('mouseout', (e) => {
				e.target.querySelector('.trees').classList.remove('over-state');
			});
		});
	}
};

const logoClickHandler = (e) => {
	//console.log('logo click handler', document.body.id);
	if (mnavi.isMobileMenuOn()) {
		//console.log('%cnavi mobile on!', cc.bgc.red);
		e.preventDefault();
	} else {
		//console.log('logo clicked.');
		clearTimeout(scrollingTO);
		isScrolling = true;

		//-
		selectThisLinkByItem(homeNavMenuLink);
		setMenuHeight(true);
		//-

		scrollingTO = setTimeout(() => {
			isScrolling = false;
		}, SCROLLING_BLOCKAGE_TIME);
	}
};

const logoClickHandlerWithoutScrollSpy = (e) => {
	//console.log('logo click handler', document.body.id);
	if (mnavi.isMobileMenuOn()) {
		//console.log('%cnavi mobile on!', cc.bgc.red);
		e.preventDefault();
	}
};

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

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&| TREES |&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//TODO: tmp
const addToMenuItemsHoverTrees = () => {
	const navis = document.querySelectorAll('.nav-menu--desktop > .nav-menu__item > .nav-menu__link');
	let template;
	let newItem;

	template = document.querySelector('#template-home-trees');
	newItem = template.content.cloneNode(true);
	navis[0].appendChild(newItem);

	template = document.querySelector('#template-aboutus-trees');
	newItem = template.content.cloneNode(true);
	navis[1].appendChild(newItem);

	template = document.querySelector('#template-offer-trees');
	newItem = template.content.cloneNode(true);
	navis[2].appendChild(newItem);

	template = document.querySelector('#template-contact-trees');
	newItem = template.content.cloneNode(true);
	navis[3].appendChild(newItem);
};
//TODO: on dom loaded -> run!
addToMenuItemsHoverTrees();
// ***
