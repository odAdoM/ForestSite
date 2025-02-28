'use strict';
import * as cc from './console-colors.min.js';
import * as navi from './navi.min.js';

//=================================================< MENU&NAV >====================================================================
// ---
// MENU - listeners, active state
// ---
const MENU_HEIGHT = 105;
const MENU_HEIGHT_MOBILE = 85;
const MENU_HEIGHT_MINI = 65;
const ROOT = document.querySelector(':root');
const BODY = document.body;
let actualMenuHeight = MENU_HEIGHT;
ROOT.style.setProperty('--menu-height--desktop', `${actualMenuHeight}px`);

const HOME_HASH = '#home';
const HOME = 'home';
const SCROLLING_BLOCKAGE_TIME = 1500;

const allHashSections = document.querySelectorAll('.hash-section');
const logoHomeBtn = document.querySelector('.logo');
const nav = document.querySelector('.nav');
const navMenuItems = document.querySelectorAll('.nav-menu--desktop .nav-menu__item .nav-menu__link[href^="#"]');
const homeNavMenuItem = document.querySelector('.nav-menu--desktop .nav-menu__item#homeLink .nav-menu__link');
let isScrolling = false;
let scrollingTO;
let currentSelectedNavMenuItem;
let currentHash;
let activeSection = null;
let fromTop = 0;
let actualScrollY = 0;
let hrefLink = '';

//============================================================================================================================================================

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

function isIndexPage() {
	console.log('contains(index-page)?', BODY.classList.contains('index-page'));
	return BODY.classList.contains('index-page');
}

function updateActiveMenu() {
	actualScrollY = window.scrollY;
	setMenuHeight();
	if (isScrolling) return;

	if (!navi.isMobileMenuOn() && isIndexPage());
	{
		console.log(navi.isMobileMenuOn(), isIndexPage());
		fromTop = actualScrollY + actualMenuHeight;
		activeSection = null;
		currentHash = currentSelectedNavMenuItem.getAttribute('href').substring(1);

		allHashSections.forEach((section) => {
			if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
				activeSection = section.id;
			}
		});

		if (activeSection !== currentHash) {
			//console.log('%c >> ', bgc.green, activeSection);
			selectThisLinkByHref(activeSection);
		}
	}
}

function setMenuHeight(isHomeFORCE = false) {
	let isHome = isHomeFORCE ? true : currentHash === HOME ? true : false;
	// console.log(`%cisHome? ${isHome}`, cc.bgc.red);

	if (!navi.isMobileMenuOn()) {
		if (actualScrollY > actualMenuHeight + 800 && !isHome) {
			actualMenuHeight = MENU_HEIGHT_MINI;
		} else {
			//console.log(`%c is mobile?%c ${navi.isMobileOn()}`, cc.colors.orange, cc.bgc.teal);

			actualMenuHeight = navi.isMobileOn() ? MENU_HEIGHT_MOBILE : MENU_HEIGHT;
		}
		//console.log('%c nav.offsetHeight', bgc.orange, nav.offsetHeight);
		ROOT.style.setProperty('--menu-height', `${actualMenuHeight}px`);
	}
}

const selectThisLinkByHref = (hrefName) => {
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
};

const selectThisLinkByItem = (link) => {
	if (link) {
		deselectNavMenu();

		link.classList.add('active');
		currentSelectedNavMenuItem = link;
	}
};

const navLinkHandler = (e) => {
	// console.log('%cdesktop navi cliked', colors.orange);
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
	if (navi.isMobileMenuOn()) {
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

//TODO: on dom loaded -> run!
//==> go!
// addToMenuItemsHoverTrees();

//TODO: !!!
function mobileViewChangeHandler(e) {
	/* if (e.matches) {
	} else {
	} */
	setMenuHeight();
}
//TODO: breakpoints from breakpoints.scss in the end!
const mediaQuery = window.matchMedia('(min-width: 960px)');
mediaQuery.addEventListener('change', mobileViewChangeHandler);

if (isIndexPage()) {
	console.log('@@@');
	selectThisLinkByItem(homeNavMenuItem);
	logoHomeBtn.addEventListener('click', logoClickHandler);
	addListenersToNavMenuLinks();
	updateActiveMenu(); //FIXME: to jest potrzebne?
}
window.addEventListener('scroll', updateActiveMenu);
mobileViewChangeHandler(mediaQuery);
