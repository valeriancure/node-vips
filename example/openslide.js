#!/usr/bin/env node

'use strict';
console.log(process.argv)
var vips = require('..');
const filename = require('path').join(__dirname, 'leica.scn')
console.log(filename)
// get a rect from a level

// autocrop trims off pixels outside the image bounds
var image = vips.Image.openslideload(filename,
  {level: 0, autocrop: true});
console.log('level size:', image.width, 'x', image.height);
// try 'vipsheader -a somefile.svs' at the command-line to see all the metadata
// fields you can get
console.log('associated images are:', image.get('slide-associated-images'));
// crop is left, top, width, height in pixels
// images are RGBA with premultiplication taken out
image.crop(100, 100, 1000, 1000).writeToFile('x.png');

// extract an associated image
image = vips.Image.openslideload(filename, {associated: 'macro'});
image.writeToFile('./macro.png');
