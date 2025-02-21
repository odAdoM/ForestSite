const toggleBtn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

const toggleClikHandler = (e) => {
	nav.classList.toggle('nav--visible');
};
toggleBtn.addEventListener('click', toggleClikHandler);

//==

function updateMenuVisibility(e) {
	if (e.matches) {
		nav.classList.add('nav--visible');
	} else {
		nav.classList.remove('nav--visible');
	}
}

//TODO: breakpoints from breakpoints.scss in the end!
const mediaQuery = window.matchMedia('(min-width: 960px)');
mediaQuery.addEventListener('change', updateMenuVisibility);

updateMenuVisibility(mediaQuery);
