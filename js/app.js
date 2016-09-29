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

(function () {
	document.addEventListener("DOMContentLoaded", init);
});

},{}]},{},["./src/js/app.js"])("./src/js/app.js")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlOi93b3JrL215X2JpdGJ1Y2tldC92aXJjaXRpZXMtdGVzdC1hcHAvc3JjL2pzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztBQUNyQyxJQUFNLGlCQUFpQixHQUFHLEdBQUcsR0FBQyxTQUFTLENBQUM7QUFDeEMsSUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUM7QUFDNUMsSUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQzs7QUFFOUQsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsR0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4RSxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixHQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFFLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUMsVUFBVSxDQUFDLENBQUM7QUFDMUUsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsR0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFNUUsSUFBTSxpQkFBaUIsR0FBRyxVQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUs7QUFDM0MsS0FBSSxXQUFXLEdBQUc7QUFDakIsS0FBRyxFQUFILEdBQUc7QUFDSCxTQUFPLEVBQVAsT0FBTztFQUNQLENBQUM7QUFDRixLQUFJLFFBQVEsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRTdDLFNBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLFNBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRTNCLFNBQVEsR0FBRyxJ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QztBQUNELGlCQUFnQixFQUFFLENBQUM7QUFDbkIsWUFBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzFELFlBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUMzRCxZQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLGFBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztDQUc1RCxDQUFBOztBQUVELElBQUksRUFBRSxDQUFDOztBQUVQLENBQUMsWUFBVTtBQUNWLFNBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNwRCxDQUFBLENBQUUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5jb25zdCBiYXNlQ2xhc3MgPSAndmlyY2l0aWVzLXNlYXJjaCc7XHJcbmNvbnN0IGJhc2VDbGFzc1NlbGVjdG9yID0gJy4nK2Jhc2VDbGFzcztcclxuY29uc3QgbG9jYWxTdG9yYWdlS2V5ID0gJ3ZpcmNpdGllc01lc3NhZ2VzJztcclxuY29uc3QgdGFnUGF0dGVybiA9IG5ldyBSZWdFeHAoL14jKFxcW1teXFxdXStcXF18XFxTKykoW1xcc1xcU10qKT8vKTtcclxuXHJcbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihiYXNlQ2xhc3NTZWxlY3RvcitcIl9faW5wdXRcIik7XHJcbmNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYmFzZUNsYXNzU2VsZWN0b3IrXCJfX2J1dHRvblwiKTtcclxuY29uc3Qgc2VhcmNoUmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihiYXNlQ2xhc3NTZWxlY3RvcitcIl9fcmVzdWx0XCIpO1xyXG5jb25zdCBzZWFyY2hNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihiYXNlQ2xhc3NTZWxlY3RvcitcIl9fbWVzc2FnZVwiKTtcclxuXHJcbmNvbnN0IGFkZFRvTG9jYWxTdG9yYWdlID0gKHRhZywgbWVzc2FnZSkgPT4ge1xyXG5cdGxldCBtZXNzYWdlSXRlbSA9IHtcclxuXHRcdHRhZyxcclxuXHRcdG1lc3NhZ2VcclxuXHR9O1xyXG5cdGxldCBtZXNzYWdlcyA9IGxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VLZXldO1xyXG5cclxuXHRtZXNzYWdlcyA9IEpTT04ucGFyc2UobWVzc2FnZXMpO1xyXG5cdG1lc3NhZ2VzLnB1c2gobWVzc2FnZUl0ZW0pO1xyXG5cclxuXHRtZXNzYWdlcyA9IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2VzKTtcclxuXHJcblx0bG9jYWxTdG9yYWdlW2xvY2FsU3RvcmFnZUtleV0gPSBtZXNzYWdlcztcclxufVxyXG5cclxuY29uc3QgZmluZEluTG9jYWxTdG9yYWdlID0gKHRhZykgPT4ge1xyXG5cclxuXHRsZXQgbWVzc2FnZXMgPSBsb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlS2V5XTtcclxuXHJcblx0bWVzc2FnZXMgPSBKU09OLnBhcnNlKG1lc3NhZ2VzKTtcclxuXHJcblx0cmV0dXJuIG1lc3NhZ2VzLmZpbHRlcihcclxuXHRcdG1lc3NhZ2UgPT4ge1xyXG5cdFx0XHRyZXR1cm4gbWVzc2FnZS50YWcgPT09IHRhZztcclxuXHRcdH1cclxuXHQpO1xyXG59XHJcblxyXG5jb25zdCBkaXNwbGF5U2VhcmNoUmVzdWx0ID0gKHRhZykgPT4ge1xyXG5cclxuXHRsZXQgc2VhcmNoUmVzdWx0SXRlbXMgPSBmaW5kSW5Mb2NhbFN0b3JhZ2UodGFnKTtcclxuXHRpZihzZWFyY2hSZXN1bHRJdGVtcy5sZW5ndGggPiAwKXtcdFxyXG5cdFx0bGV0IHNlYXJjaFJlc3VsdEl0ZW1zSFRNTCA9IHNlYXJjaFJlc3VsdEl0ZW1zLm1hcChcclxuXHRcdFx0aXRlbSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdGA8ZGl2IGNsYXNzPVwiJHtiYXNlQ2xhc3N9X19yZXN1bHQtaXRlbVwiPlxyXG5cdFx0XHRcdFx0XHQ8c3Ryb25nPiMke2l0ZW0udGFnfTwvc3Ryb25nPiAke2l0ZW0ubWVzc2FnZX1cclxuXHRcdFx0XHRcdDwvZGl2PmBcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdFx0c2VhcmNoUmVzdWx0LmlubmVySFRNTCA9IHNlYXJjaFJlc3VsdEl0ZW1zSFRNTC5qb2luKCcnKTtcclxuXHRcdHNlYXJjaFJlc3VsdC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDbGFzcytcIl9fcmVzdWx0LS1oaWRkZW5cIik7XHJcblx0fWVsc2V7XHJcblx0XHRoaWRlU2VhcmNoUmVzdWx0KClcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IGhpZGVTZWFyY2hSZXN1bHQgPSAoKSA9PiB7XHJcblx0c2VhcmNoUmVzdWx0LmNsYXNzTGlzdC5hZGQoYmFzZUNsYXNzK1wiX19yZXN1bHQtLWhpZGRlblwiKTtcclxufVxyXG5cclxuY29uc3QgcGFyc2VJbnB1dFZhbHVlID0gKHZhbHVlKSA9PiB7XHJcblx0cmV0dXJuIHRhZ1BhdHRlcm4udGVzdCh2YWx1ZSkgPyB2YWx1ZS5tYXRjaCh0YWdQYXR0ZXJuKSA6IGZhbHNlO1xyXG59XHJcblxyXG5jb25zdCBzZWFyY2hJbnB1dEhhbmRsZXIgPSAoZSkgPT4ge1xyXG5cdGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cdGxldCByZXN1bHQgPSBwYXJzZUlucHV0VmFsdWUodmFsdWUpO1xyXG5cdGlmKHR5cGVvZiByZXN1bHRbMl0gPT09ICd1bmRlZmluZWQnICYmIHJlc3VsdCl7XHJcblx0XHRkaXNwbGF5U2VhcmNoUmVzdWx0KHJlc3VsdFsxXSk7XHJcblx0fWVsc2V7XHJcblx0XHRoaWRlU2VhcmNoUmVzdWx0KCk7XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBzZWFyY2hCdXR0b25IYW5kbGVyID0gKGUpID0+IHtcclxuXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdGxldCByZXN1bHQgPSBwYXJzZUlucHV0VmFsdWUoc2VhcmNoSW5wdXQudmFsdWUpO1xyXG5cdFxyXG5cdGlmKCFyZXN1bHQgfHwgdHlwZW9mIHJlc3VsdFsyXSA9PT0gJ3VuZGVmaW5lZCcgfHwgcmVzdWx0WzJdLnRyaW0oKSA9PT0gJycpe1xyXG5cdFx0XHJcblx0XHRzZWFyY2hNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoYmFzZUNsYXNzK1wiX19tZXNzYWdlLS1oaWRkZW5cIik7XHJcblx0XHRzZWFyY2hNZXNzYWdlLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiJHtiYXNlQ2xhc3N9X19tZXNzYWdlLWVycm9yXCI+0J3QtdCy0LXRgNC90YvQuSDRhNC+0YDQvNCw0YI6ICPRgtC10LMg0YHQvtC+0LHRidC10L3QuNC1PC9kaXY+YDtcclxuXHRcdHNlYXJjaE1lc3NhZ2Uuc3R5bGUub3BhY2l0eSA9IDE7XHJcblx0XHRzZXRUaW1lb3V0KCgpPT57XHJcblx0XHRcdHNlYXJjaE1lc3NhZ2Uuc3R5bGUub3BhY2l0eSA9IDA7XHJcblx0XHR9LDE3MDApXHJcblx0XHRzZXRUaW1lb3V0KCgpPT57XHJcblx0XHRcdHNlYXJjaE1lc3NhZ2UuY2xhc3NMaXN0LmFkZChiYXNlQ2xhc3MrXCJfX21lc3NhZ2UtLWhpZGRlblwiKTtcclxuXHRcdH0sMzAwMClcclxuXHR9ZWxzZXtcclxuXHRcdGFkZFRvTG9jYWxTdG9yYWdlKHJlc3VsdFsxXSwgcmVzdWx0WzJdLnRyaW0oKSk7XHJcblx0XHRzZWFyY2hNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoYmFzZUNsYXNzK1wiX19tZXNzYWdlLS1oaWRkZW5cIik7XHJcblx0XHRzZWFyY2hNZXNzYWdlLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiJHtiYXNlQ2xhc3N9X19tZXNzYWdlLXN1Y2Nlc3NcIj7QodC+0L7QsdGJ0LXQvdC40LUg0YPRgdC/0LXRiNC90L4g0LTQvtCx0LDQstC70LXQvdC+INCyIGxvY2FsU3RvcmFnZTwvZGl2PmA7XHJcblx0XHRzZWFyY2hNZXNzYWdlLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG5cdFx0c2V0VGltZW91dCgoKT0+e1xyXG5cdFx0XHRzZWFyY2hNZXNzYWdlLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cdFx0fSwxNzAwKVxyXG5cdFx0c2V0VGltZW91dCgoKT0+e1xyXG5cdFx0XHRzZWFyY2hNZXNzYWdlLmNsYXNzTGlzdC5hZGQoYmFzZUNsYXNzK1wiX19tZXNzYWdlLS1oaWRkZW5cIik7XHJcblx0XHR9LDMwMDApXHJcblx0XHRzZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCI7XHJcblx0fVxyXG5cdFxyXG59XHJcblxyXG5jb25zdCBpZkVudGVyID0gKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHtcclxuICAgIFx0c2VhcmNoQnV0dG9uLmNsaWNrKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGluaXQgPSAoKSA9PiB7XHJcblx0aWYodHlwZW9mIGxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VLZXldID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0bG9jYWxTdG9yYWdlW2xvY2FsU3RvcmFnZUtleV0gPSBcIltdXCI7XHJcblx0fVxyXG5cdGhpZGVTZWFyY2hSZXN1bHQoKTtcclxuXHRzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHNlYXJjaElucHV0SGFuZGxlcik7XHJcblx0c2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgc2VhcmNoSW5wdXRIYW5kbGVyKTtcclxuXHRzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgaWZFbnRlcik7XHJcblx0c2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VhcmNoQnV0dG9uSGFuZGxlcik7XHJcblxyXG5cclxufVxyXG5cclxuaW5pdCgpO1xyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXQpO1xyXG59KTsiXX0=