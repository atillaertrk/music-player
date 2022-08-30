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
const volume = document.querySelector(".sound .fa-solid");
const volumeRange = document.querySelector("#volume-range");
const musicListText = document.querySelector(".music-list-text");
const listClose = document.querySelector(".content .fa-circle-xmark");
const player = new MusicPlayer(musiclist);

window.addEventListener("load", () => {
  let music = player.getMusic();
  display(music);
  createMusicList(musiclist);
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
  play.classList = "fa-solid fa-play control-btn";
  audio.pause();
  container.classList.remove("playing");
}
function playMusic() {
  play.classList = "fa-solid fa-pause control-btn";
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

volume.addEventListener("click", () => {
  if (volume.classList.contains("fa-volume-high")) {
    volume.className = "fa-solid fa-volume-off";
    volume.style = "margin-right: 17.5px;";
    volumeRange.value = 0;
    audio.muted = true;
  } else {
    volume.className = "fa-solid fa-volume-high";
    volume.style = "margin-right: 5px;";
    volumeRange.value = 33;
    audio.muted = false;
  }
});
volumeRange.addEventListener("input", () => {
  audio.volume = parseInt(volumeRange.value) / 100;
  if (audio.volume == 0) {
    volume.className = "fa-solid fa-volume-off";
    volume.style = "margin-right: 17.5px;";
  } else {
    volume.className = "fa-solid fa-volume-high";
    volume.style = "margin-right: 5px;";
  }
});
let musicList = "close";
musicListText.addEventListener("click", () => {
  if (musicList == "close") {
    document.querySelector(".right-side").style =
      "position: relative; width:300px; transition: .3s; min-height: 395px; height: 395px;";
    document.querySelector(".right-side .content").style =
      "display:block; transition: all 1s ease 1s;";
    musicList = "open";
  } else {
    document.querySelector(".right-side").style = "width:0px; transition: .3s;";
    document.querySelector(".right-side .content").style =
      "display:none; transition: 1s";
    musicList = "close";
  }
});
listClose.addEventListener("click", () => {
  document.querySelector(".right-side").style = "width:0px; transition: .3s;";
  document.querySelector(".right-side .content").style =
    "display:none; transition: 1s";
  musicList = "close";
});

function createMusicList(musiclist) {
  for (i in musiclist) {
    musicListAreaItem = `<li li-index="${i}" onclick="selectedMusic(this)"><span class="artist-title">${musiclist[
      i
    ].getName()}</span>
    <span id="totalTime-${i}" class="totalTime"></span></li>
    <audio id="music-${i}"src="/mp3/${parseInt(i) + 1}.mp3">
    `;

    document
      .querySelector("ul")
      .insertAdjacentHTML("beforeend", musicListAreaItem);

    const totalTime = document.querySelector(`#totalTime-${i}`);
    const listAudio = document.querySelector(`#music-${i}`);
    console.log(totalTime);
    console.log(listAudio);
    listAudio.addEventListener("loadedmetadata", () => {
      totalTime.innerHTML = translateTime(listAudio.duration);
    });
  }
}
function selectedMusic(li) {
  player.index = li.getAttribute("li-index");
  display(player.getMusic());
  playMusic();
}
