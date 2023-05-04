const video = document.getElementById('video');
const progressBar = document.getElementById('progress-bar');
const seekBar = document.getElementById('seek-bar');
const speedButtons = document.querySelectorAll('.speed-btns button');
let playbackRate = 1;
let seekBarWidth = progressBar.offsetWidth;

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        document.getElementById("speed-1").click();
    }
    else if (e.keyCode == '37') {
       document.getElementById("speed-2").click();
    }
    else if (e.keyCode == '39') {
       document.getElementById("speed-3").click();
    }

}

function setPlaySpeed(speed) {
	playbackRate = speed;
	video.playbackRate = speed;
}

function updateSeekBar() {
	const currentTime = video.currentTime;
	const duration = video.duration;
	let seekBarPosition = (currentTime / duration) * seekBarWidth;

	seekBarPosition = seekBarPosition * playbackRate;
	seekBar.style.transform = `translateX(${seekBarPosition}px) scaleX(${playbackRate})`;
	seekBar.style.transitionDuration='200ms';
}

video.addEventListener('play', () => {
	seekBarWidth = progressBar.offsetWidth;
});

setInterval(function () {if (!video.paused && !video.ended) {
	updateSeekBar();
}}, 500);

/*video.addEventListener('timeupdate', () => {
	if (!video.paused && !video.ended) {
		updateSeekBar();
	}
});*/

progressBar.addEventListener('click', (event) => {
	const boundingRect = progressBar.getBoundingClientRect();
	const x = event.clientX - boundingRect.left;
	const progress = x / boundingRect.width;
	video.currentTime = video.duration * progress;
});

speedButtons.forEach((button) => {
	button.addEventListener('click', () => {
		speedButtons.forEach((btn) => btn.classList.remove('active'));
		button.classList.add('active');
	});
});
