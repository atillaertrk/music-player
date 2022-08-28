const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
// const audio = document.querySelector("#audio");
const duration = document.querySelector("#duration");
const current_time = document.querySelector("#current-time");
const progressBar = document.querySelector("#progressbar");

const player = new MusicPlayer(musiclist);

window.addEventListener("load", () => {
  let music = player.getMusic();
  display(music);
});

function display(music) {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}
play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});
next.addEventListener("click", () => {
  player.next();
  let music = player.getMusic();
  display(music);
  playMusic();
});
prev.addEventListener("click", () => {
  player.previous();
  let music = player.getMusic();
  display(music);
  playMusic();
});

function pauseMusic() {
  play.classList = "fa-solid fa-play";
  audio.pause();
  container.classList.remove("playing");
}
function playMusic() {
  play.classList = "fa-solid fa-pause";
  audio.play();
  container.classList.add("playing");
}

function translateTime(totalSecond) {
  const minute = Math.floor(totalSecond / 60);
  const second = Math.floor(totalSecond % 60);
  const isSingleDigit = second < 10 ? `0${second}` : `${second}`;
  const time = `${minute}:${isSingleDigit}`;
  return time;
}

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = translateTime(audio.duration);
  progressBar.max = audio.duration;
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  current_time.textContent = translateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
  current_time.textContent = translateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});
