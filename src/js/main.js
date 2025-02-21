'use strict';

//=================================================< MENU&NAV >====================================================================
// ---
// MENU - listeners, active state
// ---
const MENU_HEIGHT = 105;
const MENU_HEIGHT_MINI = 65;
const root = document.querySelector(':root');
let actualMenuHeight = MENU_HEIGHT;
root.style.setProperty('--menu-height--desktop', `${actualMenuHeight}px`);
// let actualMenuHeight = getComputedStyle(document.documentElement).getPropertyValue('--menu-height--desktop').slice(0, -2);

const HOME_HASH = '#home';
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

/* const scrollHandler = () => {
	//TODO: dodać warunek klasy main w index.hmtl
	currentSection = window.scrollY;

	console.log('currentHash', currentHash, 'blockage', blockage);
	if (!blockage) {
		currentHash = currentSelectedNavMenuItem.getAttribute('href');
		if (currentHash.startsWith('#')) currentHash = currentHash.slice(1);
		allHashSections.forEach((section) => {
			if (
				currentSection > section.offsetTop - actualMenuHeight &&
				currentSection < section.offsetTop + section.offsetHeight - actualMenuHeight
			) {
				//console.log(section.className, 'start: ', (section.offsetTop - actualMenuHeight),' end: ',(section.offsetTop + section.offsetHeight - actualMenuHeight));
				//console.log('currentSection', currentSection, ' current selected: ', currentHash, '???', section.id);
				if (currentHash !== section.id) {
					console.log('%c>>>>> do select', bgc.red, section.id, actualMenuHeight);
					selectThisLinkByHref(section.id);
					return;
				}
			}
		});
	}
	//==
	setMenuHeight();
};
*/

function updateActiveMenu() {
	actualScrollY = window.scrollY;
	setMenuHeight();
	if (isScrolling) return;

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
	} //else console.log('%c ten sam hash!', bgc.red, currentHash);

	//tu usunie z wszystkich niekatywnych wiec sekcja z reklama bedzie zerowac zaznaczenie w menu
	/* navMenuItems.forEach((link) => {
		link.classList.toggle('active', link.getAttribute('href').substring(1) === activeSection);
	}); */
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
	console.log('logo clicked.');
	clearTimeout(scrollingTO);
	isScrolling = true;

	//-
	selectThisLinkByItem(homeNavMenuItem);
	setMenuHeight(true);
	//-

	scrollingTO = setTimeout(() => {
		isScrolling = false;
	}, SCROLLING_BLOCKAGE_TIME);
};

const setMenuHeight = (isHome = false) => {
	if (actualScrollY > actualMenuHeight + 800 /* nav.offsetHeight + 800 */ && !isHome) {
		actualMenuHeight = MENU_HEIGHT_MINI;
	} else {
		actualMenuHeight = MENU_HEIGHT;
	}
	//console.log('%c nav.offsetHeight', bgc.orange, nav.offsetHeight);
	root.style.setProperty('--menu-height--desktop', `${actualMenuHeight}px`);
};

//TODO: on dom loaded -> run!
//==> go!
// addToMenuItemsHoverTrees();

selectThisLinkByItem(homeNavMenuItem);
logoHomeBtn.addEventListener('click', logoClickHandler);
addListenersToNavMenuLinks();
updateActiveMenu();
window.addEventListener('scroll', updateActiveMenu);
