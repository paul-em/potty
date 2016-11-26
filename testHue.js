'use strict';

const hue = require('./app/hue');
hue.connect().then(()=>hue.effectColorLoop());