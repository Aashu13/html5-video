var videoContainer = document.querySelector(".videoPlayer");
var video = videoContainer.querySelector("#viewer");
var playBtn = videoContainer.querySelector(".playBtn");
var progress = videoContainer.querySelector(".progress");
var progressFeild = videoContainer.querySelector(".progressfiled");
var rangesInput = videoContainer.querySelectorAll(".player-slider");
var skipButtons = videoContainer.querySelectorAll("[data-skip]");
console.log(progress);

function updateButton() {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = "<i class='fa fa-pause'></i>";
  } else {
    video.pause();
    playBtn.innerHTML = "<i class='fa fa-play'></i>";
  }
}

function skipVideo() {
  video.currentTime += parseFloat(this.dataset.skip);
  console.log(this.dataset.skip);
}

function increaseVolume() {
  video[this.name] = this.value;
}

function handleProgress() {
  var percent = (video.currentTime / video.duration) * 100;
  progressFeild.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  var scrubTiming = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTiming;
}

video.addEventListener("click", updateButton);
playBtn.addEventListener("click", updateButton);
skipButtons.forEach(buttons => buttons.addEventListener("click", skipVideo));

rangesInput.forEach(ranges =>
  ranges.addEventListener("change", increaseVolume)
);

video.addEventListener("timeupdate", handleProgress);

var mousemove = false;
rangesInput.forEach(ranges =>
  ranges.addEventListener("mousemove", increaseVolume)
);

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => {
  if (mousemove) {
    scrub();
  }
});
progress.addEventListener("mousedown", () => false);
progress.addEventListener("mouseup", () => true);
