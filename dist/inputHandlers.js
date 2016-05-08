'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.inputHandler = inputHandler;
exports.listenForCtrlC = listenForCtrlC;

var _sounds = require('./sounds.js');

var _actions = require('./actions.js');

function inputHandler(store) {
	return function (str, key) {
		var _store$getState = store.getState();

		var mode = _store$getState.mode;

		if (mode === 'info') {
			store.dispatch((0, _actions.testMode)());

			var _store$getState2 = store.getState();

			var bins = _store$getState2.bins;

			var newQuestion = pickRandomQuestion(bins[0]);
			store.dispatch((0, _actions.setQuestion)(newQuestion));
		} else {
			store.dispatch((0, _actions.questionInput)(str, key));

			var _store$getState3 = store.getState();

			var input = _store$getState3.input;
			var question = _store$getState3.question;
			var _bins = _store$getState3.bins;

			if (input === question.answer) {
				(0, _sounds.correct)();
				var _newQuestion = pickRandomQuestion(_bins[0]);
				store.dispatch((0, _actions.setQuestion)(_newQuestion));
			}
		}
	};
}

function pickRandomQuestion(bin) {
	var randomQuestion = Math.floor(bin.length * Math.random());
	return bin[randomQuestion];
}

function listenForCtrlC(_, key) {
	if (key.ctrl && key.name === 'c') {
		process.kill(process.pid, 'SIGINT');
	}
}
//# sourceMappingURL=inputHandlers.js.map