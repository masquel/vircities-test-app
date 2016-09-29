"use strict";

const baseClass = 'vircities-search';
const baseClassSelector = '.'+baseClass;
const localStorageKey = 'vircitiesMessages';
const tagPattern = new RegExp(/^#(\[[^\]]+\]|\S+)([\s\S]*)?/);

const searchInput = document.querySelector(baseClassSelector+"__input");
const searchButton = document.querySelector(baseClassSelector+"__button");
const searchResult = document.querySelector(baseClassSelector+"__result");
const searchMessage = document.querySelector(baseClassSelector+"__message");

const addToLocalStorage = (tag, message) => {
	let messageItem = {
		tag,
		message
	};
	let messages = localStorage[localStorageKey];

	messages = JSON.parse(messages);
	messages.push(messageItem);

	messages = JSON.stringify(messages);

	localStorage[localStorageKey] = messages;
}

const findInLocalStorage = (tag) => {

	let messages = localStorage[localStorageKey];

	messages = JSON.parse(messages);

	return messages.filter(
		message => {
			return message.tag === tag;
		}
	);
}

const displaySearchResult = (tag) => {

	let searchResultItems = findInLocalStorage(tag);
	if(searchResultItems.length > 0){	
		let searchResultItemsHTML = searchResultItems.map(
			item => {
				return (
					`<div class="${baseClass}__result-item">
						<strong>#${item.tag}</strong> ${item.message}
					</div>`
				);
			}
		);
		searchResult.innerHTML = searchResultItemsHTML.join('');
		searchResult.classList.remove(baseClass+"__result--hidden");
	}else{
		hideSearchResult()
	}
}

const hideSearchResult = () => {
	searchResult.classList.add(baseClass+"__result--hidden");
}

const parseInputValue = (value) => {
	return tagPattern.test(value) ? value.match(tagPattern) : false;
}

const searchInputHandler = (e) => {
	let value = e.target.value;
	let result = parseInputValue(value);
	if(typeof result[2] === 'undefined' && result){
		displaySearchResult(result[1]);
	}else{
		hideSearchResult();
	}
}

const searchButtonHandler = (e) => {
	e.preventDefault();

	let result = parseInputValue(searchInput.value);

	if(!result || typeof result[2] === 'undefined' || result[2].trim() === ''){
		
		searchMessage.classList.remove(baseClass+"__message--hidden");
		searchMessage.innerHTML = `<div class="${baseClass}__message-error">Неверный формат: #тег сообщение</div>`;
		searchMessage.style.opacity = 1;
		setTimeout(()=>{
			searchMessage.style.opacity = 0;
		},1700)
		setTimeout(()=>{
			searchMessage.classList.add(baseClass+"__message--hidden");
		},3000)
	}else{
		addToLocalStorage(result[1], result[2].trim());
		searchMessage.classList.remove(baseClass+"__message--hidden");
		searchMessage.innerHTML = `<div class="${baseClass}__message-success">Сообщение успешно добавлено в localStorage</div>`;
		searchMessage.style.opacity = 1;
		setTimeout(()=>{
			searchMessage.style.opacity = 0;
		},1700)
		setTimeout(()=>{
			searchMessage.classList.add(baseClass+"__message--hidden");
		},3000)
		searchInput.value = "";
	}
	
}

const ifEnter = (e) => {
    e.preventDefault();
    if (e.keyCode == 13) {
    	searchButton.click();
    }
}

const init = () => {
	if(typeof localStorage[localStorageKey] === 'undefined') {
		localStorage[localStorageKey] = "[]";
	}
	hideSearchResult();
	searchInput.addEventListener('input', searchInputHandler);
	searchInput.addEventListener('change', searchInputHandler);
	searchInput.addEventListener("keyup", ifEnter);
	searchButton.addEventListener('click', searchButtonHandler);

}

init();

/*(function(){
	document.addEventListener('DOMContentLoaded', init);
});*/