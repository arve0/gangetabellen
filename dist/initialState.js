'use strict';

module.exports = function () {
  var arr = [];
  for (var i = 0; i <= 10; ++i) {
    for (var j = 0; j <= 10; ++j) {
      arr.push({
        x: i,
        y: j
      });
    }
  }
  return arr;
};