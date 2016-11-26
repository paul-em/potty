const nas = require('./nas');
const hue = require('./hue');
const playsound = require('./playsound');

playsound.playBootSong();

nas.connect()
  .then(() => nas.loadSounds())
  .then((sounds) => playsound.play(sounds));

hue.connect(() => hue.pulsate());