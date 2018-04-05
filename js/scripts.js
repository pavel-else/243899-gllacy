// "use strict";

var link = document.querySelector(".map__button");
var overlay = document.querySelector(".overlay");

var feedback = document.querySelector(".feedback");
var form = feedback.querySelector(".feedback__form");
var close = feedback.querySelector(".feedback__button--close");
var login = feedback.querySelector(".feedback__input--name");
var email = feedback.querySelector(".feedback__input--email");
var submit = feedback.querySelector(".feedback__button--submit");


var isStorageSupport = true;
var storage = "";

function enableOverlay() {
	var overlay = document.querySelector(".overlay");
	overlay.classList.add("overlay--show");
}

function disableOverlay() {
	var overlay = document.querySelector(".overlay");
	overlay.classList.remove("overlay--show");
}

// Проверка работоспособности localStorage
try {
	storage = localStorage.getItem("login");
} catch (err) {
	isStorageSupport = false;
}

//Закрытие модального окна по клавише ESC
window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (feedback.classList.contains("feedback--show")) {
        feedback.classList.remove("feedback--show");
    	feedback.classList.remove("feedback--error");
      }

      disableOverlay();
    }
});

// ФОРМА ОБРАТНОЙ СВЯЗИ - ОБРАБОТКА СОБЫТИЙ
link.addEventListener("click", function (evt) {
	evt.preventDefault();
	feedback.classList.add("feedback--show");
	enableOverlay();
	login.focus();

	if (isStorageSupport) {
		login.value = localStorage.getItem("login");
		email.value = localStorage.getItem("email");
	}

	(!login.value) ? login.focus() : email.focus();
});

close.addEventListener("click", function (evt) {
	evt.preventDefault();
	feedback.classList.remove("feedback--show");
   	feedback.classList.remove("feedback--error");
   	disableOverlay();
});

form.addEventListener("submit", function (evt) {
   	evt.preventDefault();

    if (!login.value || !email.value) {
    	feedback.classList.remove("feedback--error");
    	feedback.offsetWidth = feedback.offsetWidth;
    	feedback.classList.add("feedback--error");
    } else {
    	if (isStorageSupport) {
	    	localStorage.setItem("login", login.value); 
	    	localStorage.setItem("email", email.value); 
    	}

    	feedback.classList.remove("feedback--show");
    	disableOverlay();
    	alert('Ваше обращение будет рассмотрено в ближайшее время.')
    }
});


// СЛАЙДЕР
var body = document.querySelector(".page");
var slider = document.querySelector(".slider");
var slider__buttons = slider.querySelectorAll(".slider__r-button");
var slider__pages = slider.querySelectorAll(".slider__page");
 
for (var i = 0; i < slider__buttons.length; i++) {
	(function (i) {
		slider__buttons[i].addEventListener("click", function (evt) {
			evt.preventDefault();
			removeActiveButton();
			removeActivePage();
			removeBackground();
			slider__buttons[i].classList.add("active");
			slider__pages[i].classList.add("active");
			body.classList.add("body--bg-" + i);			
		});
	})(i);
}


function removeActivePage() {
	var slider__pages = slider.getElementsByClassName("slider__page");

	for (var i = 0; i < slider__pages.length; i++ ) {
		slider__pages[i].classList.remove("active");
	}
}

function removeActiveButton() {
	var slider__buttons = slider.getElementsByClassName("slider__r-button");

	for (var i = 0; i < slider__buttons.length; i++ ) {
		slider__buttons[i].classList.remove("active");
	}
}

function removeBackground() {
	var slider__pages = slider.getElementsByClassName("slider__page");
	var body = document.querySelector(".page");

	for (var i = 0; i < slider__pages.length; i++ ) {
		body.classList.remove("body--bg-" + i);
	}	
}