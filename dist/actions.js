'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.questionInput = questionInput;
exports.exit = exit;

var _sounds = require('./sounds.js');

function questionInput(store) {
	return function (str, key) {
		var _store$getState = store.getState();

		var mode = _store$getState.mode;

		if (mode === 'info') {
			pickNextQuestion(store);
		} else {
			store.dispatch({ type: 'QUESTION_INPUT', input: str, key: key });

			var _store$getState2 = store.getState();

			var input = _store$getState2.input;
			var question = _store$getState2.question;

			if (input === question.answer) {
				(0, _sounds.correct)();
				pickNextQuestion(store);
			}
		}
	};
}

function pickNextQuestion(store) {
	var _store$getState3 = store.getState();

	var bins = _store$getState3.bins;

	var randomQuestion = Math.floor(bins[0].length * Math.random());
	store.dispatch({
		type: 'QUESTION',
		question: bins[0][randomQuestion]
	});
}

function exit(store) {
	return function () {
		var l = store.getState().bins[1].length;
		console.log('\nGot ' + l + ' correct' + (l > 1 ? ' ones' : '') + '.');
		process.exit();
	};
}

function getRandomQuestionAnswer(above, below) {}
//# sourceMappingURL=actions.js.map