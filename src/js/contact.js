'use strict';

import * as helper from './add/helper.min.js';
import * as cc from './add/console-colors.min.js';
import * as navi from './navi.min.js';

const sendBtn = document.querySelector('.send-btn');
const formName = document.querySelector('#name');
const formEmail = document.querySelector('#email');
const formContent = document.querySelector('#content');

const showError = (input, message) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-input');
	formBox.classList.add('error');
	errorMsg.textContent = message;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value.trim() === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
			//return true;
		}
	});

	console.log(errorCount);
	if (errorCount === 0) return false;
	else return true;
	// return false;
};

const validateEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value.trim())) clearError(email);
	else showError(email, 'E-mail jest niepoprawny.');
};

const validateName = (forname) => {
	const re =
		/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:[- ](?:[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+))* [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:[- ](?:[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+))*$/;
	/* bez PL:  /^[A-Z][a-z]+ [A-Z][a-z]+$/; */

	if (re.test(forname.value.trim())) clearError(forname);
	else showError(forname, 'Imię i nazwisko są niepoprawne.');
};

//==>
navi.settingsFromContact();

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();

	checkForm([formName, formEmail, formContent]);
	validateName(formName);
	validateEmail(email);
	if (!checkErrors()) {
		console.log('ślij!');
	}
});

formName.addEventListener('blur', (e) => {
	checkForm([formName]);
	validateName(formName);
});
formEmail.addEventListener('blur', (e) => {
	checkForm([formEmail]);
	validateEmail(email);
});
formContent.addEventListener('blur', (e) => {
	checkForm([formContent]);
});
