const footerYear = document.querySelector('.footer__year');

const setCurrentYear = () => {
	let year = new Date().getFullYear();
	footerYear.innerText = year;
};

setCurrentYear();
