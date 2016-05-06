'use strict';

var _reducer = require('./reducer.js');

var _reducer2 = _interopRequireDefault(_reducer);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('QUESTION', function (t) {
	var state = (0, _reducer2.default)();
	t.true(state.bins[0].length === 100);

	state = (0, _reducer2.default)(state, {
		type: 'QUESTION',
		question: state.bins[0][0]
	});

	t.true(state.question.x === 1);
	t.true(state.bins[0].length === 99);
});

(0, _ava2.default)('INPUT', function (t) {
	var state = (0, _reducer2.default)();
	t.true(state.input === '');

	state = (0, _reducer2.default)(state, {
		type: 'INPUT',
		input: '1'
	});

	t.true(state.input === '1');
});

(0, _ava2.default)('INPUT backspace', function (t) {
	var state = (0, _reducer2.default)();

	state = (0, _reducer2.default)(state, {
		type: 'INPUT',
		input: '1'
	});
	state = (0, _reducer2.default)(state, {
		type: 'INPUT',
		input: '1',
		key: { name: 'backspace' }
	});

	t.true(state.input === '');
});

(0, _ava2.default)('Answers correct to all questions', function (t) {
	var state = (0, _reducer2.default)();
	var questions = state.bins[0];

	// move all to next bin
	questions.map(function (question) {
		state = (0, _reducer2.default)(state, {
			type: 'QUESTION',
			question: question
		});
		question.answer.split('').map(function (input) {
			state = (0, _reducer2.default)(state, { type: 'INPUT', input: input });
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
		state = (0, _reducer2.default)(state, { type: 'INPUT', input: input });
	});

	t.true(state.bins[0].length === 0);
	t.true(state.bins[1].length === 99);
	t.true(state.bins[2].length === 1);
});
//# sourceMappingURL=reducer.test.js.map