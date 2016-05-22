'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.inputHandler = inputHandler;

var _sounds = require('./sounds.js');

var _actions = require('./actions.js');

function inputHandler(store) {
	return function (str, key) {
		// Ctrl + C
		if (key.ctrl && key.name === 'c') {
			process.kill(process.pid, 'SIGINT');
		}

		var _store$getState = store.getState();

		var mode = _store$getState.mode;
		var info = _store$getState.info;

		if (mode === 'info' && info.nextState === 'test') {
			// start test
			var testQuestions = getTestQuestions(store.getState().questions);
			store.dispatch((0, _actions.startTest)(testQuestions));
		} else if (mode === 'test') {
			// test answer
			store.dispatch((0, _actions.questionInput)(str, key));

			var _store$getState2 = store.getState();

			var input = _store$getState2.input;
			var test = _store$getState2.test;

			if (input === test.questions[0].answer) {
				// correct test answer
				(0, _sounds.correct)();
				store.dispatch((0, _actions.testCorrectAnswer)());
			}
			if (store.getState().test.questions.length === 0) {
				// test done
				store.dispatch((0, _actions.testDone)());
			}
		} else if (mode === 'info' && info.nextState === 'round') {
			// start round
			store.dispatch((0, _actions.startRound)());
		} else if (mode === 'round') {
			// round answer
		} else {
				store.dispatch((0, _actions.questionInput)(str, key));

				var _store$getState3 = store.getState();

				var _input = _store$getState3.input;
				var question = _store$getState3.question;
				var bins = _store$getState3.bins;

				if (_input === question.answer) {
					(0, _sounds.correct)();
					var newQuestion = pickRandomQuestion(bins[0]);
					store.dispatch((0, _actions.setQuestion)(newQuestion));
				}
			}
	};
}

function pickRandomQuestion(bin) {
	var randomQuestion = Math.floor(bin.length * Math.random());
	return bin[randomQuestion];
}

function getTestQuestions(bin) {
	var pool = bin.filter(function (q) {
		return q.x > 1 && q.x < 6 && q.answer < 40;
	});
	var questions = [];

	var _loop = function _loop(i) {
		// copy question into array
		var q = pickRandomQuestion(pool);
		pool = pool.filter(function (qq) {
			return qq !== q;
		});
		questions.push(_extends({}, q));
	};

	for (var i = 0; i < 10; ++i) {
		_loop(i);
	}
	return questions;
}
//# sourceMappingURL=inputHandlers.js.map