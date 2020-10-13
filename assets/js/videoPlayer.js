const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volBtn = document.getElementById("jsVolumeButton");
const fullScrnBtn = document.getElementById("jsFullscreen");

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

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    videoPlayer.muted = true;
    volBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
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

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", handleScreenClick);
}

if (videoContainer) {
  init();
}
