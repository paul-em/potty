const hue = require("node-hue-api");
const HueApi = hue.HueApi;
const lightState = hue.lightState;

let api;

exports.connect = () => {
  api = new HueApi(process.env.HUE_HOST, process.env.HUE_USER);
  return api.config().then((config)=>console.log(config)).done();
};

exports.pulsate = () => new Promise((resolve, reject) => {
  resolve();
});