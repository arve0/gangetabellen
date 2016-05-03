"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateQuestions;
/**
 * Generate an array of questions.
 *
 * [{x: 1, y: 2, text: '1 x 2'}, ...]
 */

function generateQuestions() {
  var arr = [];
  for (var x = 0; x <= 10; ++x) {
    for (var y = 0; y <= 10; ++y) {
      arr.push({
        x: x,
        y: y,
        text: x + " x " + y,
        answer: x * y
      });
    }
  }
  return arr;
}