const hue = require("node-hue-api");
const settings = require("./../config.json").hue;
const HueApi = hue.HueApi;
const state = hue.lightState.create();

let api;
let pulsateStateOn = false;

exports.connect = () => {
  api = new HueApi(settings.host, settings.user);
  console.log('HUE light: connecting');
  return api.lights().then((lights) => console.log('loaded HUE config', lights));
};

exports.pulsate = () => new Promise((resolve, reject) => {
  console.log('HUE light: pulsate: start');
  setInterval(function () {
    console.log('HUE light: pulsate: turning state to', pulsateStateOn ? 'off' : 'on');
    api.setLightState(settings.light, pulsateStateOn ? state.off() : state.on()).done();
    pulsateStateOn = !pulsateStateOn;
  }, 1000);
  resolve();
});

exports.effectColorLoop = () => new Promise((resolve, reject) => {
  console.log('HUE light: effectColorLoop');
  return api.setLightState(settings.light, state.on())
    .then(api.setLightState(settings.light, state.sat(50)))
    .then(api.setLightState(settings.light, state.effectColorLoop()))
    .done();
});
