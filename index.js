const nas = require('./app/nas');
const hue = require('./app/hue');
const playsound = require('./app/playsound');

console.log('alright alright alright');

playsound.playBootSong();

nas.connect()
  .then(() => nas.loadSounds())
  .then((sounds) => playsound.play(sounds));

hue.connect()
  .then(() => hue.effectColorLoop());