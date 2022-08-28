class MusicPlayer {
  constructor(musiclist) {
    this.musiclist = musiclist;
    this.index = 0;
  }
  getMusic() {
    return this.musiclist[this.index];
  }
  next() {
    if (this.musiclist.length == this.index + 1) {
      this.index = 0;
    } else {
      this.index++;
    }
  }
  previous() {
    if (this.index > 0) {
      this.index--;
    } else {
      this.index = this.musiclist.length - 1;
    }
  }
}
