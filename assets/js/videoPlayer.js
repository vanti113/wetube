const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volBtn = document.getElementById("jsVolumeButton");
const fullScrnBtn = document.getElementById("jsFullscreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
};

function handleScreenClick() {
  const isFullScrn = document.fullscreenElement;
  if (!isFullScrn) {
    videoContainer.requestFullscreen().catch((error) => console.log(error));
    fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  } else {
    document.exitFullscreen();
    fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  }
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function handleVolumeClick() {
  if (videoPlayer.muted) {
    volBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    videoPlayer.muted = false;
    volumeRange.value = videoPlayer.volume;
  } else {
    volBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    videoPlayer.muted = true;
    volumeRange.value = 0;
  }
}

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  console.log(totalTime);
  totalTime.innerText = totalTimeString;
}
function setCurrentTime() {
  const currentTimeString = formatDate(videoPlayer.currentTime);
  currentTime.innerText = currentTimeString;
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  registerView();
}
function handleDrag(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.3) {
    volBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", handleScreenClick);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("timeupdate", setCurrentTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
  videoPlayer.volume = 0.5;
}

if (videoContainer) {
  init();
}
