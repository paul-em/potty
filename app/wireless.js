require('dotenv').config();

const WiFiControl = require('wifi-control');
WiFiControl.init({
  debug: true,
  iface: 'wlan0'
});

let connected = false;
let ip = null;

exports.connect = () =>
  new Promise((resolve, reject) => {
    WiFiControl.connectToAP({
      ssid: process.env.SSID,
      password: process.env.SSID_PW
    }, function (err, response) {
      console.log(err || response);
      if(err){
        reject(err);
      } else {
        resolve(response);
      }
    });
  });

exports.connected = () => connected;



