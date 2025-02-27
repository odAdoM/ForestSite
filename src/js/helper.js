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
