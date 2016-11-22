require('dotenv').config();

const Wireless = require('wireless');

let connected = false;
let ip = null;

exports.connect = () =>
  new Promise((resolve, reject) => {
    const wireless = new Wireless({
      iface: 'wlan0',
      updateFrequency: 10,
      connectionSpyFrequency: 2,
      vanishThreshold: 2
    });

    wireless.enable(function (err) {
      if (err) {
        console.log('Error enabling wireless', err);
        return reject(err);
      }
      wireless.start();
    });

    wireless.on('appear', (network) => {
      console.log(network.ssid, 'appeared');
      if (network.ssid === process.env.SSID) {
        wireless.stop(() => {
          console.log('joining', network, process.env.SSID_PW);
          wireless.join(network, process.env.SSID_PW, (err) => {
            if (err) {
              console.log('Unable to connect', err);
              return reject(err);
            }
            console.log('connected to', process.env.SSID);
            wireless.dhcp((_ip) => {
              ip = _ip;
              console.log('got ip', ip);
              connected = true;
              resolve(ip);
            })
          });
        });
      }
    });

    wireless.on('error', (message) => {
      console.log("[   ERROR] " + message);
    });
  });

exports.connected = () => connected;



