'use strict'

// Get Elements
// ========================

// FOR VideoPlayer
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');

const progressBox = player.querySelector('.player__progress');
const progressBar = player.querySelector('.player__progress--filled');

const volume = player.querySelector('.player__vol');
const speed = player.querySelector('.player__speed');

const minusBtn = player.querySelector('.minus');
const plusBtn = player.querySelector('.plus');

const playBtn = player.querySelector('.toogle');
const playBtnIcon = player.querySelector('.toogle>.player__icon');

let mouseDown = false;



// Decorators
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Build functions
// ========================
function togglePlay(e) {
	video.paused ? video.play() : video.pause();
}
function updateBtn() {
	const iconClasses = playBtn.classList;
	iconClasses.toggle('pause');
	iconClasses.toggle('play');
}
function progressSkip(e) {
	const skipTime = parseFloat(this.dataset.skip);
	video.currentTime += skipTime;
}
function rangesHandler() {
	video[this.name] = parseFloat(this.value);
}
function progressUpdate() {
	const way = (video.currentTime/video.duration)*100;
	progressBar.style.flexBasis = `${way}%`;
}
function progressGoTo(e) {
	video.currentTime = (e.layerX / this.offsetWidth)*video.duration;
}
const progressScrub = debounce(function progressScrub(e) {
	if (!mouseDown) {return}
	video.currentTime = (e.layerX / this.offsetWidth)*video.duration;
}, 10, true);


// Event Listeners
// ========================

// Video
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', progressUpdate);
// ScrollVideo
progressBox.addEventListener('click', progressGoTo);
progressBox.addEventListener('mousemove', progressScrub );
progressBox.addEventListener('mousedown', () => {mouseDown = true} );
progressBox.addEventListener('mouseup', () => {mouseDown = false} );
// Buttons
playBtn.addEventListener('click', togglePlay);
plusBtn.addEventListener('click', progressSkip);
minusBtn.addEventListener('click', progressSkip);
// Ranges
volume.addEventListener('change', rangesHandler);
speed.addEventListener('change', rangesHandler);







// PlayList
// ========================

const playlist = document.querySelector('.player__playlist');
const playlistItem = document.querySelectorAll('.playlist__item');


playlistItem.forEach( (item) => {
	const itemName = item.querySelector('.playlist__name');
	const itemAuthot = item.querySelector('.playlist__author');
	itemName.innerHTML = item.dataset.videoname;
	itemAuthot.innerHTML = item.dataset.videoauthor;
} )

function videoChangeHandler(e) {
	video.paused ? '' : updateBtn();
	video.setAttribute('src', this.dataset.videourl);

	video.currentTime = 0;
	progressBar.style.flexBasis = '0%';

	playlistItem.forEach( (item) => {item.classList.remove('active')} );
	this.classList.add('active');
	
}







playlistItem.forEach( (item) => {
	item.addEventListener('click', videoChangeHandler)
} )





