class Music {
  constructor(title, singer, img, file) {
    this.singer = singer;
    this.title = title;
    this.img = img;
    this.file = file;
  }
  getName() {
    return this.singer + " - " + this.title;
  }
}

const musiclist = [
  new Music("Boşver", "Nilüfer", "1.jpeg", "1.mp3"),
  new Music("Bu da Geçer mi Sevgilim", "Yalın", "2.jpeg", "2.mp3"),
  new Music("Aramızda Uçurumlar", "Suat Suna", "3.jpeg", "3.mp3"),
];
