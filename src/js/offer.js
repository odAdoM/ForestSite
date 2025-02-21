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
