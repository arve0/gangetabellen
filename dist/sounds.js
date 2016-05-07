'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.correct = correct;
exports.wrong = wrong;

var _path = require('path');

var _child_process = require('child_process');

function correct() {
	play('correct.wav');
}

function wrong() {
	play('wrong.wav');
}

function play(filename) {
	var fullPath = (0, _path.join)(__dirname, 'sounds', filename);
	(0, _child_process.exec)('afplay ' + fullPath); // osx only
}
//# sourceMappingURL=sounds.js.map