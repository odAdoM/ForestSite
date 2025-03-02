'use strict';

import * as cc from './console-colors.min.js';
import * as helper from './helper.min.js';

const ROOT = document.querySelector(':root');
const BODY = document.body;
const toggleBtn = document.querySelector('.nav-toggle');
const hamburgerBtn = toggleBtn.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const mobileNav = nav.querySelector('.nav-menu--mobile');
const mobileNavItems = mobileNav.querySelectorAll('.nav-menu__item');
let mobileScrollBlockageTO;
let isMobileViewOn;

export function isMobileMenuOn() {
	return nav.classList.contains('nav--visible') && mobileNav.classList.contains('nav-menu--mobile--active');
}

export function isMobileOn() {
	return isMobileViewOn; //window.getComputedStyle(toggleBtn).display !== 'none';
}

//=====================================================================================================================================

const toggleClikHandler = (e) => {
	nav.classList.toggle('nav--visible');
	mobileNav.classList.toggle('nav-menu--mobile--active');

	// -----   if opened  ------
	if (nav.classList.contains('nav--visible') && mobileNav.classList.contains('nav-menu--mobile--active')) {
		//console.log('%c run menu animation', cc.bgc.green);
		hamburgerBtn.classList.add('closed');
		runMobileNavAnimation();
		mobileScrollBlockageTO = setTimeout(openMenu, 300);
	}
	// -----   if closed  ------
	else {
		//console.log('%c close menu', cc.bgc.red);
		clearTimeout(mobileScrollBlockageTO);
		closeMenu(true);
		hamburgerBtn.classList.remove('closed');
		resetMobileNavAnimation();
	}
};

const delayOffset = 0.1;
const runMobileNavAnimation = () => {
	let delayTime = 0.1;

	mobileNavItems.forEach((item) => {
		delayTime += delayOffset;
		item.classList.add('nav-menu-item-animation');
		item.style.animationDelay = delayTime + 's';
	});
};

const resetMobileNavAnimation = () => {
	mobileNavItems.forEach((item) => {
		item.classList.remove('nav-menu-item-animation');
		item.style.animationDelay = 0 + 's';
	});
};

function mobileNavItemClickHandler() {
	mobileNavItems.forEach((item) => {
		item.addEventListener('click', () => {
			resetMobileMenu();
		});
	});
}

//================================================================

function updateMenuVisibility(e) {
	if (e.matches) {
		isMobileViewOn = false;
		nav.classList.add('nav--visible');
	} else {
		isMobileViewOn = true;
		resetMobileMenu();
	}
}

function resetMobileMenu() {
	clearTimeout(mobileScrollBlockageTO);
	closeMenu(false);
	nav.classList.remove('nav--visible');
	mobileNav.classList.remove('nav-menu--mobile--active');
	hamburgerBtn.classList.remove('closed');
	resetMobileNavAnimation();
}

//TODO: breakpoints from breakpoints.scss in the end!
const mediaQuery = window.matchMedia('(min-width: 960px)');
mediaQuery.addEventListener('change', updateMenuVisibility);

//================================================================

/* 
	these functions allow to turn on/off moving all site content under menu
	prevention of unwanted/not ended scrolling animation or smooth # link targeting
 */

let scrollPosition = 0;

function openMenu() {
	//console.log('open menu');
	ROOT.style.scrollBehavior = 'auto';
	scrollPosition = window.scrollY;
	BODY.style.overflow = 'hidden';
	BODY.style.position = 'absolute';
	BODY.style.top = `-${scrollPosition}px`;
	BODY.style.width = '100%';
}

function closeMenu(backToPreviousScrollPosition = true) {
	//console.log('close menu - back scroll ? ', backToPreviousScrollPosition);
	BODY.style.overflow = 'visible';
	BODY.style.position = 'static';
	BODY.style.top = '0px';
	if (backToPreviousScrollPosition) window.scrollTo(0, scrollPosition);
	ROOT.style.scrollBehavior = 'smooth';
}

//================================================================
//==>
resetMobileNavAnimation();
mobileNavItemClickHandler();
updateMenuVisibility(mediaQuery);
toggleBtn.addEventListener('click', toggleClikHandler);
