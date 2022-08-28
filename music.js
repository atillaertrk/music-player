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
  new Music("Ah Yaşamak Var Ya", "Athena", "1.jpeg", "1.mp3"),
  new Music("Teslim Olma", "Sokrat St x Ozbi", "2.jpeg", "2.mp3"),
  new Music("Koca Yaşlı Şişko Dünya", "Adamlar", "3.jpeg", "3.mp3"),
];
