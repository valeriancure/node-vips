/* global it, describe, beforeEach */

'use strict';

const assert = require('assert');
const vips = require('../../');

function almostEqual (a, b, precision) {
  precision = typeof precision !== 'undefined' ? precision : 0.000001;

  return Math.abs(a - b) < precision;
}

describe('Image arithmetic', function () {
  beforeEach(function () {
    if ('gc' in global) {
      console.log('gc-ing');
      global.gc();
    }
  });

  it('.add works with scalar, vector and image arguments', function () {
    var image = vips.Image.black(2, 1);
    var image2;

    image2 = image.add(1);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [1]);

    image2 = image.add([1, 2]);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [1, 2]);

    image2 = image2.add(image2);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [2, 4]);
  });

  it('.subtract works with scalar, vector and image arguments', function () {
    var image = vips.Image.black(2, 1);
    var image2;

    image2 = image.add(10).subtract(1);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [9]);

    image2 = image.add([10, 11]).subtract([9, 3]);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [1, 8]);

    image2 = image.add(image2).add(image2).subtract(image2);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [1, 8]);
  });

  it('.rsubtract works with scalar, vector and image arguments', function () {
    var image = vips.Image.black(2, 1);
    var image2;

    image2 = image.add(10).rsubtract(20);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [10]);

    image2 = image.add([10, 11]).rsubtract([12, 16]);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [2, 5]);

    image2 = image.add(image2).add(image2).rsubtract(image2);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [-2, -5]);
  });

  it('.multiply works with scalar, vector and image arguments', function () {
    var image = vips.Image.black(2, 1);
    var image2;

    image2 = image.add(1).multiply(2);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [2]);

    image2 = image.add([1, 2]).multiply([2, 3]);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [2, 6]);

    image2 = image2.multiply(image2);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [4, 36]);
  });

  it('.divide works with scalar, vector and image arguments', function () {
    var image = vips.Image.black(2, 1);
    var image2;

    image2 = image.add(10).divide(2);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [5]);

    image2 = image.add([10, 30]).divide([2, 3]);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [5, 10]);

    image2 = image2.add(image2).divide(image2);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [2, 2]);
  });

  it('.rdivide works with scalar, vector and image arguments', function () {
    var image = vips.Image.black(2, 1);
    var image2;

    image2 = image.add(2).rdivide(10);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [5]);

    image2 = image.add([2, 3]).rdivide([10, 30]);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [5, 10]);

    image2 = image2.rdivide(image2.add(image2));
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [2, 2]);
  });

  it('.remainder works with scalar, vector and image arguments', function () {
    var image = vips.Image.black(2, 1);
    var image2;

    image2 = image.add(10).remainder(3);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [1]);

    image2 = image.add([10, 30]).remainder([3, 4]);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [1, 2]);

    image2 = image2.add(image2).remainder(image2);
    assert.strictEqual(image2.width, 2);
    assert.strictEqual(image2.height, 1);
    assert.strictEqual(image2.format, 'float');
    assert.strictEqual(image2.interpretation, 'b-w');
    assert.deepEqual(image2.getpoint(0, 0), [0, 0]);
  });

  it('Trigs and logs work', function () {
    var image = vips.Image.black(2, 1).add(29);
    var image2 = image.sin().cos().tan().exp().exp10();
    var image3 = image2.log10().log().atan().acos().asin();
    almostEqual(image3.avg(), 29, 0.001);
  });
});
