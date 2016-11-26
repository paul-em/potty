const mpg321 = require('mpg321');
const fs = require('fs');
const path = require('path');
const soundsDir = path.resolve(__dirname, '..', 'sounds');
const bootSong = 'boot.mp3';

let bootPlaying = false;
let playlist, playPos = 0;


exports.playBootSong = () => {
  console.log('Playsound: playing bootsong');
  const player = mpg321().remote();
  bootPlaying = true;
  player.play(bootSong);
  player.on('end', () => {
    if (bootPlaying) {
      console.log('bootsong end!');
      exports.playBootSong();
    }
  });
};

exports.play = (songs) => {
  console.log('Playsound: playing songs', songs);
  bootPlaying = false;
  playlist = songs;
  randomizeList();
  playNext();
};

function playNext() {
  const player = mpg321().remote();
  playPos++;
  if (playPos === playlist.length) {
    playPos = 0;
    randomizeList();
  }
  try {
    console.log('Playsound: playing', path.resolve(soundsDir, playlist[playPos]));
    player.play(path.resolve(soundsDir, playlist[playPos]));
  } catch (e) {
    console.log(e);
    playNext();
  }

  player.on('end', function () {
    playNext();
  });
}


function randomizeList() {
  let from, to, tmp;
  for (let i = 0; i < 100; i++) {
    from = Math.floor(Math.random() * playlist.length);
    to = Math.floor(Math.random() * playlist.length);
    tmp = playlist[from];
    playlist[from] = playlist[to];
    playlist[to] = tmp;
  }
}
