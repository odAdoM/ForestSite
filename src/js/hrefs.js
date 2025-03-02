'use strict';

import * as helper from './add/helper.min.js';
import * as cc from './add/console-colors.min.js';

//====================================================================================================================

const MENU_ITEMS = {
	home: {
		hash: '#home',
		page: 'index.html',
	},
	aboutus: {
		hash: '#aboutus',
		page: null,
	},
	offer: {
		hash: '#offer',
		page: 'offer.html',
	},
	contact: {
		hash: null,
		page: 'contact.html',
	},
};

//logo
const logoHomeBtn = document.querySelector('.logo');

//menu navi
const homeNavMenuItem = document.querySelector('.nav-menu__item#homeItem .nav-menu__link');
const aboutusNavMenuItem = document.querySelector('.nav-menu__item#aboutusItem .nav-menu__link');
const offerNavMenuItem = document.querySelector('.nav-menu__item#offerItem .nav-menu__link');
const contactNavMenuItem = document.querySelector('.nav-menu__item#contactItem .nav-menu__link');

const homeNavMenuItem_mobi = document.querySelector('.nav-menu__item#homeItemMobi .nav-menu__link--mobile');
const aboutusNavMenuItem_mobi = document.querySelector('.nav-menu__item#aboutusItemMobi .nav-menu__link--mobile');
const offerNavMenuItem_mobi = document.querySelector('.nav-menu__item#offerItemMobi .nav-menu__link--mobile');
const contactNavMenuItem_mobi = document.querySelector('.nav-menu__item#contactItemMobi .nav-menu__link--mobile');

//footer links
const footerItems = document.querySelectorAll('.footer__box-list-item > a');

function setHrefs() {
	console.log('set hrefs at: ', document.body.id);

	switch (document.body.id) {
		case 'index-page':
			logoHomeBtn.setAttribute('href', MENU_ITEMS.home.hash);

			homeNavMenuItem.setAttribute('href', MENU_ITEMS.home.hash);
			aboutusNavMenuItem.setAttribute('href', MENU_ITEMS.aboutus.hash);
			offerNavMenuItem.setAttribute('href', MENU_ITEMS.offer.hash);
			contactNavMenuItem.setAttribute('href', MENU_ITEMS.contact.page);

			homeNavMenuItem_mobi.setAttribute('href', MENU_ITEMS.home.hash);
			aboutusNavMenuItem_mobi.setAttribute('href', MENU_ITEMS.aboutus.hash);
			offerNavMenuItem_mobi.setAttribute('href', MENU_ITEMS.offer.hash);
			contactNavMenuItem_mobi.setAttribute('href', MENU_ITEMS.contact.page);

			//temp - for now only to the top
			footerItems.forEach((item) => {
				item.setAttribute('href', MENU_ITEMS.home.hash);
			});

			break;

		case 'contact-page':
			logoHomeBtn.setAttribute('href', MENU_ITEMS.home.page + MENU_ITEMS.home.hash);

			homeNavMenuItem.setAttribute('href', MENU_ITEMS.home.page + MENU_ITEMS.home.hash);
			aboutusNavMenuItem.setAttribute('href', MENU_ITEMS.home.page + MENU_ITEMS.aboutus.hash);
			offerNavMenuItem.setAttribute('href', MENU_ITEMS.home.page + MENU_ITEMS.offer.hash);
			contactNavMenuItem.setAttribute('href', '#');

			homeNavMenuItem_mobi.setAttribute('href', MENU_ITEMS.home.page + MENU_ITEMS.home.hash);
			aboutusNavMenuItem_mobi.setAttribute('href', MENU_ITEMS.home.page + MENU_ITEMS.aboutus.hash);
			offerNavMenuItem_mobi.setAttribute('href', MENU_ITEMS.home.page + MENU_ITEMS.offer.hash);
			contactNavMenuItem_mobi.setAttribute('href', '#');

			//temp - for now only to the top
			footerItems.forEach((item) => {
				item.setAttribute('href', '#');
			});
			break;
	}
}

setHrefs();
