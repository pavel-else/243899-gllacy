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

// Проверка работоспособности localStorage
try {
	storage = localStorage.getItem("login");
} catch (err) {
	isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
	evt.preventDefault();
	feedback.classList.add("feedback--show");
	enableOverlay();
	login.focus();

	if (isStorageSupport) {
		login.value = localStorage.getItem("login");
		email.value = localStorage.getItem("email");
	}

	login.value ? email.focus()  : login.focus();
	email.value ? submit.focus() : email.focus();
});

close.addEventListener("click", function (evt) {
	evt.preventDefault();
	feedback.classList.remove("feedback--show");
   	feedback.classList.remove("feedback--error");
   	disableOverlay();
});

form.addEventListener("submit", function (evt) {
    if (!login.value || !email.value) {
    	evt.preventDefault();
    	console.log('Error!');
	    feedback.classList.remove("feedback-error");
      	feedback.offsetWidth = feedback.offsetWidth;
    	feedback.classList.add("feedback--error");
    } else {
    	if (isStorageSupport) {
	    	localStorage.setItem("login", login.value); 
	    	localStorage.setItem("email", email.value); 
    	}

    	feedback.classList.remove("feedback--show");
    	disableOverlay();
    }

});

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

function enableOverlay() {
	var overlay = document.querySelector(".overlay");
	overlay.classList.add("overlay--show");
}

function disableOverlay() {
	var overlay = document.querySelector(".overlay");
	overlay.classList.remove("overlay--show");
}