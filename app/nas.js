const fs = require('fs');
const path = require('path');
const Client = require('ftp');
const settings = require("./../config.json").nas;
const ftp = new Client();
const localSoundDir = path.resolve(__dirname, '..', 'sounds');
const remoteSoundDir = '/MegaEm/NAS/Toilette';

exports.connect = () => new Promise((resolve, reject) => {
  console.log('NAS: connecting');
  ftp.on('ready', function () {
    console.log('NAS: ready');
    resolve();
  });
  ftp.connect(settings);
});

exports.loadSounds = () => new Promise((resolve, reject) => {
  console.log('NAS: loading sounds');
  ftp.list(remoteSoundDir, (err, remoteList) => {
    if (err) {
      return reject(err);
    }
    fs.readdir(localSoundDir, (err, localList) => {
      if (err) {
        return reject(err);
      }
      let toLoad = [];
      let completeList = remoteList.map(remoteSound => {
        if (!localList.find(item => item == remoteSound.name)) {
          toLoad.push(loadFile(remoteSound.name));
        }
        return remoteSound.name;
      });
      if (toLoad.length > 0) {
        console.log('NAS: need to load', toLoad.length);
        Promise.all(toLoad)
          .then(function (list) {
            resolve(completeList);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        resolve(completeList);
      }
    });
  })
});


function loadFile(file) {
  return new Promise((resolve, reject) => {
    ftp.get(remoteSoundDir + '/' + file, (err, stream) => {
      if (err) {
        return reject(err);
      }
      stream.pipe(fs.createWriteStream(localSoundDir + '/' + file));
      stream.once('close', () => resolve(file));
    });
  });
}