'use strict';

export function getRandomInteger(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export function insertHardSpaceBetweenLastTwoWords(text) {
	let words = text.split(' ');
	if (words.length > 2) {
		words[words.length - 2] += '&nbsp;' + words.pop();
		return words.join(' ');
	}
}


export function checkActualHashLocation() {
	let href = window.location.href;
	let index = href.lastIndexOf('#');
	return index !== -1 ? href.substring(index + 1) : null;
}
