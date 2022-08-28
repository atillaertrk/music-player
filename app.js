const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const audio = document.querySelector("#audio");

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
