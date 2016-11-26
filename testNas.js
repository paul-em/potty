'use strict';

const nas = require('./app/nas');
nas.connect()
  .then(()=>nas.loadSounds())
  .then((list)=>console.log('finished', list));