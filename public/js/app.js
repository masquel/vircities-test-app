(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.app = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/app.js":[function(_dereq_,module,exports){
"use strict";

var baseClass = "vircities-search";
var baseClassSelector = "." + baseClass;
var localStorageKey = "vircitiesMessages";
var tagPattern = new RegExp(/^#(\[[^\]]+\]|\S+)([\s\S]*)?/);

var searchInput = document.querySelector(baseClassSelector + "__input");
var searchButton = document.querySelector(baseClassSelector + "__button");
var searchResult = document.querySelector(baseClassSelector + "__result");
var searchMessage = document.querySelector(baseClassSelector + "__message");

var addToLocalStorage = function (tag, message) {
	var messageItem = {
		tag: tag,
		message: message
	};
	var messages = localStorage[localStorageKey];

	messages = JSON.parse(messages);
	messages.push(messageItem);

	messages = JSON.stringify(messages);

	localStorage[localStorageKey] = messages;
};

var findInLocalStorage = function (tag) {

	var messages = localStorage[localStorageKey];

	messages = JSON.parse(messages);

	return messages.filter(function (message) {
		return message.tag === tag;
	});
};

var displaySearchResult = function (tag) {

	var searchResultItems = findInLocalStorage(tag);
	if (searchResultItems.length > 0) {
		var searchResultItemsHTML = searchResultItems.map(function (item) {
			return "<div class=\"" + baseClass + "__result-item\">\n\t\t\t\t\t\t<strong>#" + item.tag + "</strong> " + item.message + "\n\t\t\t\t\t</div>";
		});
		searchResult.innerHTML = searchResultItemsHTML.join("");
		searchResult.classList.remove(baseClass + "__result--hidden");
	} else {
		hideSearchResult();
	}
};

var hideSearchResult = function () {
	searchResult.classList.add(baseClass + "__result--hidden");
};

var parseInputValue = function (value) {
	return tagPattern.test(value) ? value.match(tagPattern) : false;
};

var searchInputHandler = function (e) {
	var value = e.target.value;
	var result = parseInputValue(value);
	if (typeof result[2] === "undefined" && result) {
		displaySearchResult(result[1]);
	} else {
		hideSearchResult();
	}
};

var searchButtonHandler = function (e) {
	e.preventDefault();

	var result = parseInputValue(searchInput.value);

	if (!result || typeof result[2] === "undefined" || result[2].trim() === "") {

		searchMessage.classList.remove(baseClass + "__message--hidden");
		searchMessage.innerHTML = "<div class=\"" + baseClass + "__message-error\">Неверный формат: #тег сообщение</div>";
		searchMessage.style.opacity = 1;
		setTimeout(function () {
			searchMessage.style.opacity = 0;
		}, 1700);
		setTimeout(function () {
			searchMessage.classList.add(baseClass + "__message--hidden");
		}, 3000);
	} else {
		addToLocalStorage(result[1], result[2].trim());
		searchMessage.classList.remove(baseClass + "__message--hidden");
		searchMessage.innerHTML = "<div class=\"" + baseClass + "__message-success\">Сообщение успешно добавлено в localStorage</div>";
		searchMessage.style.opacity = 1;
		setTimeout(function () {
			searchMessage.style.opacity = 0;
		}, 1700);
		setTimeout(function () {
			searchMessage.classList.add(baseClass + "__message--hidden");
		}, 3000);
		searchInput.value = "";
	}
};

var ifEnter = function (e) {
	e.preventDefault();
	if (e.keyCode == 13) {
		searchButton.click();
	}
};

var init = function () {
	if (typeof localStorage[localStorageKey] === "undefined") {
		localStorage[localStorageKey] = "[]";
	}
	hideSearchResult();
	searchInput.addEventListener("input", searchInputHandler);
	searchInput.addEventListener("change", searchInputHandler);
	searchInput.addEventListener("keyup", ifEnter);
	searchButton.addEventListener("click", searchButtonHandler);
};

init();

/*(function(){
	document.addEventListener('DOMContentLoaded', init);
});*/

},{}]},{},["./src/js/app.js"])("./src/js/app.js")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlOi93b3JrL215X2JpdGJ1Y2tldC92aXJjaXRpZXMtdGVzdC1hcHAvc3JjL2pzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztBQUNyQyxJQUFNLGlCQUFpQixHQUFHLEdBQUcsR0FBQyxTQUFTLENBQUM7QUFDeEMsSUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUM7QUFDNUMsSUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQzs7QUFFOUQsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsR0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4RSxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixHQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFFLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUMsVUFBVSxDQUFDLENBQUM7QUFDMUUsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsR0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFNUUsSUFBTSxpQkFBaUIsR0FBRyxVQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUs7QUFDM0MsS0FBSSxXQUFXLEdBQUc7QUFDakIsS0FBRyxFQUFILEdBQUc7QUFDSCxTQUFPLEVBQVAsT0FBTztFQUNQLENBQUM7QUFDRixLQUFJLFFBQVEsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRTdDLFNBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLFNBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRTNCLFNBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVwQyxhQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsUUFBUSxDQUFDO0NBQ3pDLENBQUE7O0FBRUQsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLEdBQUcsRUFBSzs7QUFFbkMsS0FBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUU3QyxTQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFaEMsUUFBTyxRQUFRLENBQUMsTUFBTSxDQUNyQixVQUFBLE9BQU8sRUFBSTtBQUNWLFNBQU8sT0FBTyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUM7RUFDM0IsQ0FDRCxDQUFDO0NBQ0YsQ0FBQTs7QUFFRCxJQUFNLG1CQUFtQixHQUFHLFVBQUMsR0FBRyxFQUFLOztBQUVwQyxLQUFJLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hELEtBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztBQUMvQixNQUFJLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FDaEQsVUFBQSxJQUFJLEVBQUk7QUFDUCw0QkFDZ0IsU0FBUywrQ0FDWixJQUFJLENBQUMsR0FBRyxrQkFBYSxJQUFJLENBQUMsT0FBTyx3QkFFNUM7R0FDRixDQUNELENBQUM7QUFDRixjQUFZLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN4RCxjQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUMsa0JBQWtCLENBQUMsQ0FBQztFQUM1RCxNQUFJO0FBQ0osa0JBQWdCLEVBQUUsQ0FBQTtFQUNsQjtDQUNELENBQUE7O0FBRUQsSUFBTSxnQkFBZ0IsR0FBRyxZQUFNO0FBQzlCLGFBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0NBQ3pELENBQUE7O0FBRUQsSUFBTSxlQUFlLEdBQUcsVUFBQyxLQUFLLEVBQUs7QUFDbEMsUUFBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDO0NBQ2hFLENBQUE7O0FBRUQsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLENBQUMsRUFBSztBQUNqQyxLQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUMzQixLQUFJLE1BQU0sR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEMsS0FBRyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLElBQUksTUFBTSxFQUFDO0FBQzdDLHFCQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQUk7QUFDSixrQkFBZ0IsRUFBRSxDQUFDO0VBQ25CO0NBQ0QsQ0FBQTs7QUFFRCxJQUFNLG1CQUFtQixHQUFHLFVBQUMsQ0FBQyxFQUFLO0FBQ2xDLEVBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFbkIsS0FBSSxNQUFNLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFaEQsS0FBRyxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBQzs7QUFFekUsZUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDOUQsZUFBYSxDQUFDLFNBQVMscUJBQWtCLFNBQVMsNERBQXdELENBQUM7QUFDM0csZUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLFlBQVUsQ0FBQyxZQUFJO0FBQ2QsZ0JBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztHQUNoQyxFQUFDLElBQUksQ0FBQyxDQUFBO0FBQ1AsWUFBVSxDQUFDLFlBQUk7QUFDZCxnQkFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFDLG1CQUFtQixDQUFDLENBQUM7R0FDM0QsRUFBQyxJQUFJLENBQUMsQ0FBQTtFQUNQLE1BQUk7QUFDSixtQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDL0MsZUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDOUQsZUFBYSxDQUFDLFNBQVMscUJBQWtCLFNBQVMseUVBQXFFLENBQUM7QUFDeEgsZUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLFlBQVUsQ0FBQyxZQUFJO0FBQ2QsZ0JBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztHQUNoQyxFQUFDLElBQUksQ0FBQyxDQUFBO0FBQ1AsWUFBVSxDQUFDLFlBQUk7QUFDZCxnQkFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFDLG1CQUFtQixDQUFDLENBQUM7R0FDM0QsRUFBQyxJQUFJLENBQUMsQ0FBQTtBQUNQLGFBQVcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0VBQ3ZCO0NBRUQsQ0FBQTs7QUFFRCxJQUFNLE9BQU8sR0FBRyxVQUFDLENBQUMsRUFBSztBQUNuQixFQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsS0FBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRTtBQUNwQixjQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDckI7Q0FDSixDQUFBOztBQUVELElBQU0sSUFBSSxHQUFHLFlBQU07QUFDbEIsS0FBRyxPQUFPLFlBQVksQ0FBQyxlQUFlLENBQUMsS0FBSyxXQUFXLEVBQUU7QUFDeEQsY0FBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQztFQUNyQztBQUNELGlCQUFnQixFQUFFLENBQUM7QUFDbkIsWUFBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzFELFlBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUMzRCxZQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLGFBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztDQUU1RCxDQUFBOztBQUVELElBQUksRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuY29uc3QgYmFzZUNsYXNzID0gJ3ZpcmNpdGllcy1zZWFyY2gnO1xyXG5jb25zdCBiYXNlQ2xhc3NTZWxlY3RvciA9ICcuJytiYXNlQ2xhc3M7XHJcbmNvbnN0IGxvY2FsU3RvcmFnZUtleSA9ICd2aXJjaXRpZXNNZXNzYWdlcyc7XHJcbmNvbnN0IHRhZ1BhdHRlcm4gPSBuZXcgUmVnRXhwKC9eIyhcXFtbXlxcXV0rXFxdfFxcUyspKFtcXHNcXFNdKik/Lyk7XHJcblxyXG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYmFzZUNsYXNzU2VsZWN0b3IrXCJfX2lucHV0XCIpO1xyXG5jb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJhc2VDbGFzc1NlbGVjdG9yK1wiX19idXR0b25cIik7XHJcbmNvbnN0IHNlYXJjaFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYmFzZUNsYXNzU2VsZWN0b3IrXCJfX3Jlc3VsdFwiKTtcclxuY29uc3Qgc2VhcmNoTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYmFzZUNsYXNzU2VsZWN0b3IrXCJfX21lc3NhZ2VcIik7XHJcblxyXG5jb25zdCBhZGRUb0xvY2FsU3RvcmFnZSA9ICh0YWcsIG1lc3NhZ2UpID0+IHtcclxuXHRsZXQgbWVzc2FnZUl0ZW0gPSB7XHJcblx0XHR0YWcsXHJcblx0XHRtZXNzYWdlXHJcblx0fTtcclxuXHRsZXQgbWVzc2FnZXMgPSBsb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlS2V5XTtcclxuXHJcblx0bWVzc2FnZXMgPSBKU09OLnBhcnNlKG1lc3NhZ2VzKTtcclxuXHRtZXNzYWdlcy5wdXNoKG1lc3NhZ2VJdGVtKTtcclxuXHJcblx0bWVzc2FnZXMgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlcyk7XHJcblxyXG5cdGxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VLZXldID0gbWVzc2FnZXM7XHJcbn1cclxuXHJcbmNvbnN0IGZpbmRJbkxvY2FsU3RvcmFnZSA9ICh0YWcpID0+IHtcclxuXHJcblx0bGV0IG1lc3NhZ2VzID0gbG9jYWxTdG9yYWdlW2xvY2FsU3RvcmFnZUtleV07XHJcblxyXG5cdG1lc3NhZ2VzID0gSlNPTi5wYXJzZShtZXNzYWdlcyk7XHJcblxyXG5cdHJldHVybiBtZXNzYWdlcy5maWx0ZXIoXHJcblx0XHRtZXNzYWdlID0+IHtcclxuXHRcdFx0cmV0dXJuIG1lc3NhZ2UudGFnID09PSB0YWc7XHJcblx0XHR9XHJcblx0KTtcclxufVxyXG5cclxuY29uc3QgZGlzcGxheVNlYXJjaFJlc3VsdCA9ICh0YWcpID0+IHtcclxuXHJcblx0bGV0IHNlYXJjaFJlc3VsdEl0ZW1zID0gZmluZEluTG9jYWxTdG9yYWdlKHRhZyk7XHJcblx0aWYoc2VhcmNoUmVzdWx0SXRlbXMubGVuZ3RoID4gMCl7XHRcclxuXHRcdGxldCBzZWFyY2hSZXN1bHRJdGVtc0hUTUwgPSBzZWFyY2hSZXN1bHRJdGVtcy5tYXAoXHJcblx0XHRcdGl0ZW0gPT4ge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRgPGRpdiBjbGFzcz1cIiR7YmFzZUNsYXNzfV9fcmVzdWx0LWl0ZW1cIj5cclxuXHRcdFx0XHRcdFx0PHN0cm9uZz4jJHtpdGVtLnRhZ308L3N0cm9uZz4gJHtpdGVtLm1lc3NhZ2V9XHJcblx0XHRcdFx0XHQ8L2Rpdj5gXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHRcdHNlYXJjaFJlc3VsdC5pbm5lckhUTUwgPSBzZWFyY2hSZXN1bHRJdGVtc0hUTUwuam9pbignJyk7XHJcblx0XHRzZWFyY2hSZXN1bHQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ2xhc3MrXCJfX3Jlc3VsdC0taGlkZGVuXCIpO1xyXG5cdH1lbHNle1xyXG5cdFx0aGlkZVNlYXJjaFJlc3VsdCgpXHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBoaWRlU2VhcmNoUmVzdWx0ID0gKCkgPT4ge1xyXG5cdHNlYXJjaFJlc3VsdC5jbGFzc0xpc3QuYWRkKGJhc2VDbGFzcytcIl9fcmVzdWx0LS1oaWRkZW5cIik7XHJcbn1cclxuXHJcbmNvbnN0IHBhcnNlSW5wdXRWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xyXG5cdHJldHVybiB0YWdQYXR0ZXJuLnRlc3QodmFsdWUpID8gdmFsdWUubWF0Y2godGFnUGF0dGVybikgOiBmYWxzZTtcclxufVxyXG5cclxuY29uc3Qgc2VhcmNoSW5wdXRIYW5kbGVyID0gKGUpID0+IHtcclxuXHRsZXQgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuXHRsZXQgcmVzdWx0ID0gcGFyc2VJbnB1dFZhbHVlKHZhbHVlKTtcclxuXHRpZih0eXBlb2YgcmVzdWx0WzJdID09PSAndW5kZWZpbmVkJyAmJiByZXN1bHQpe1xyXG5cdFx0ZGlzcGxheVNlYXJjaFJlc3VsdChyZXN1bHRbMV0pO1xyXG5cdH1lbHNle1xyXG5cdFx0aGlkZVNlYXJjaFJlc3VsdCgpO1xyXG5cdH1cclxufVxyXG5cclxuY29uc3Qgc2VhcmNoQnV0dG9uSGFuZGxlciA9IChlKSA9PiB7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRsZXQgcmVzdWx0ID0gcGFyc2VJbnB1dFZhbHVlKHNlYXJjaElucHV0LnZhbHVlKTtcclxuXHJcblx0aWYoIXJlc3VsdCB8fCB0eXBlb2YgcmVzdWx0WzJdID09PSAndW5kZWZpbmVkJyB8fCByZXN1bHRbMl0udHJpbSgpID09PSAnJyl7XHJcblx0XHRcclxuXHRcdHNlYXJjaE1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ2xhc3MrXCJfX21lc3NhZ2UtLWhpZGRlblwiKTtcclxuXHRcdHNlYXJjaE1lc3NhZ2UuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCIke2Jhc2VDbGFzc31fX21lc3NhZ2UtZXJyb3JcIj7QndC10LLQtdGA0L3Ri9C5INGE0L7RgNC80LDRgjogI9GC0LXQsyDRgdC+0L7QsdGJ0LXQvdC40LU8L2Rpdj5gO1xyXG5cdFx0c2VhcmNoTWVzc2FnZS5zdHlsZS5vcGFjaXR5ID0gMTtcclxuXHRcdHNldFRpbWVvdXQoKCk9PntcclxuXHRcdFx0c2VhcmNoTWVzc2FnZS5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHRcdH0sMTcwMClcclxuXHRcdHNldFRpbWVvdXQoKCk9PntcclxuXHRcdFx0c2VhcmNoTWVzc2FnZS5jbGFzc0xpc3QuYWRkKGJhc2VDbGFzcytcIl9fbWVzc2FnZS0taGlkZGVuXCIpO1xyXG5cdFx0fSwzMDAwKVxyXG5cdH1lbHNle1xyXG5cdFx0YWRkVG9Mb2NhbFN0b3JhZ2UocmVzdWx0WzFdLCByZXN1bHRbMl0udHJpbSgpKTtcclxuXHRcdHNlYXJjaE1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ2xhc3MrXCJfX21lc3NhZ2UtLWhpZGRlblwiKTtcclxuXHRcdHNlYXJjaE1lc3NhZ2UuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCIke2Jhc2VDbGFzc31fX21lc3NhZ2Utc3VjY2Vzc1wiPtCh0L7QvtCx0YnQtdC90LjQtSDRg9GB0L/QtdGI0L3QviDQtNC+0LHQsNCy0LvQtdC90L4g0LIgbG9jYWxTdG9yYWdlPC9kaXY+YDtcclxuXHRcdHNlYXJjaE1lc3NhZ2Uuc3R5bGUub3BhY2l0eSA9IDE7XHJcblx0XHRzZXRUaW1lb3V0KCgpPT57XHJcblx0XHRcdHNlYXJjaE1lc3NhZ2Uuc3R5bGUub3BhY2l0eSA9IDA7XHJcblx0XHR9LDE3MDApXHJcblx0XHRzZXRUaW1lb3V0KCgpPT57XHJcblx0XHRcdHNlYXJjaE1lc3NhZ2UuY2xhc3NMaXN0LmFkZChiYXNlQ2xhc3MrXCJfX21lc3NhZ2UtLWhpZGRlblwiKTtcclxuXHRcdH0sMzAwMClcclxuXHRcdHNlYXJjaElucHV0LnZhbHVlID0gXCJcIjtcclxuXHR9XHJcblx0XHJcbn1cclxuXHJcbmNvbnN0IGlmRW50ZXIgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PSAxMykge1xyXG4gICAgXHRzZWFyY2hCdXR0b24uY2xpY2soKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgaW5pdCA9ICgpID0+IHtcclxuXHRpZih0eXBlb2YgbG9jYWxTdG9yYWdlW2xvY2FsU3RvcmFnZUtleV0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRsb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlS2V5XSA9IFwiW11cIjtcclxuXHR9XHJcblx0aGlkZVNlYXJjaFJlc3VsdCgpO1xyXG5cdHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgc2VhcmNoSW5wdXRIYW5kbGVyKTtcclxuXHRzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzZWFyY2hJbnB1dEhhbmRsZXIpO1xyXG5cdHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBpZkVudGVyKTtcclxuXHRzZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWFyY2hCdXR0b25IYW5kbGVyKTtcclxuXHJcbn1cclxuXHJcbmluaXQoKTtcclxuXHJcbi8qKGZ1bmN0aW9uKCl7XHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXQpO1xyXG59KTsqLyJdfQ==
