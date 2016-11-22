const mpg321 = require('mpg321');
const fs = require('fs');
const path = require('path');
const soundsDir = path.resolve(__dirname, '..', 'sounds');
const bootSong = 'boot.mp3';

let bootPlaying = false;
let playlist, playPos = 0;


const player = mpg321().remote();
player.on('end', function () {
  if (bootPlaying) {
    console.log('bootsong end!');
    exports.playBootSong();
  } else {
    playNext();
  }
});


exports.playBootSong = () => {
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
  bootPlaying = false;
  playlist = songs;
  randomizeList();
  playNext();
};

function playNext() {
  playPos++;
  if (playPos === playlist.length) {
    playPos = 0;
    randomizeList();
  }
  try {
    player.play(path.resolve(soundsDir, playlist[playPos]));
  } catch (e) {
    playNext();
  }
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
