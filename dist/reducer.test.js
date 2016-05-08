'use strict';

var _reducer = require('./reducer.js');

var _reducer2 = _interopRequireDefault(_reducer);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('INFO', function (t) {
	var state = (0, _reducer2.default)();
	t.truthy(state.info);

	state = (0, _reducer2.default)(state, {
		type: 'INFO',
		info: {
			text: 'asdf'
		}
	});

	t.true(state.mode === 'info');
	t.true(state.info.text === 'asdf');
});

(0, _ava2.default)('MODE', function (t) {
	var state = (0, _reducer2.default)();
	t.true(state.mode === '');

	state = (0, _reducer2.default)(state, {
		type: 'MODE',
		mode: 'test'
	});

	t.true(state.mode === 'test');
});

(0, _ava2.default)('TEST', function (t) {
	var state = (0, _reducer2.default)();
	t.truthy(state.test);

	state = (0, _reducer2.default)(state, {
		type: 'TEST',
		test: {
			answerAbove: 2,
			answerBelow: 20
		}
	});

	t.true(state.mode === 'test');
	t.true(state.test.answerAbove === 2);
	t.true(state.test.answerBelow === 20);
});

(0, _ava2.default)('QUESTION', function (t) {
	var state = (0, _reducer2.default)();
	t.true(state.bins[0].length === 100);

	var question = state.bins[0][0];
	state = (0, _reducer2.default)(state, {
		type: 'QUESTION',
		question: question
	});

	t.true(state.question.x === question.x);
	t.true(state.bins[0].length === 99);
});

(0, _ava2.default)('QUESTION_INPUT', function (t) {
	var state = (0, _reducer2.default)();
	t.true(state.input === '');

	state = (0, _reducer2.default)(state, {
		type: 'QUESTION_INPUT',
		input: '1'
	});

	t.true(state.input === '1');
});

(0, _ava2.default)('QUESTION_INPUT: backspace', function (t) {
	var state = (0, _reducer2.default)();

	state = (0, _reducer2.default)(state, {
		type: 'QUESTION_INPUT',
		input: '1'
	});
	t.true(state.input === '1');
	state = (0, _reducer2.default)(state, {
		type: 'QUESTION_INPUT',
		input: '1',
		key: { name: 'backspace' }
	});

	t.true(state.input === '');
});

(0, _ava2.default)('Moves questions upon correct answer', function (t) {
	var state = (0, _reducer2.default)();
	var questions = state.bins[0];

	// move all to next bin
	questions.map(function (question) {
		state = (0, _reducer2.default)(state, {
			type: 'QUESTION',
			question: question
		});
		question.answer.split('').map(function (input) {
			state = (0, _reducer2.default)(state, { type: 'QUESTION_INPUT', input: input });
		});
	});

	t.true(state.bins[0].length === 0);
	t.true(state.bins[1].length === 100);

	// move one to next bin
	state = (0, _reducer2.default)(state, {
		type: 'QUESTION',
		question: state.bins[1][10]
	});
	state.question.answer.split('').map(function (input) {
		state = (0, _reducer2.default)(state, { type: 'QUESTION_INPUT', input: input });
	});

	t.true(state.bins[0].length === 0);
	t.true(state.bins[1].length === 99);
	t.true(state.bins[2].length === 1);
});
//# sourceMappingURL=reducer.test.js.map