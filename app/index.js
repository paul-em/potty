

const wireless = require('./wireless');
const nas = require('./nas');
const hue = require('./hue');
const playsound = require('./playsound');

playsound.playBootSong();

wireless.connect().then(() => {
    nas.connect()
        .then(()=>nas.loadSounds())
        .then((sounds)=>playsound.play(sounds));

    hue.connect(()=>hue.pulsate());
});