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
const playBtnIcon = player.querySelector('.toogle>.fa');
let mouseDown = false;

// FOR Playlist
const playlist = document.querySelectorAll('.playlist__item');


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
	e.preventDefault;
	video.paused ? video.play() : video.pause();
}
function updateBtn() {
	const iconClasses = playBtnIcon.classList;
	iconClasses.toggle('fa-pause');
	iconClasses.toggle('fa-play');
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
}, 50, true);










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




