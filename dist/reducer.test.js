'use strict';

var _reducer = require('./reducer.js');

var _reducer2 = _interopRequireDefault(_reducer);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _actions = require('./actions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

(0, _ava2.default)((0, _actions.setInfo)().type, function (t) {
	var state = (0, _reducer2.default)();
	t.truthy(state.info);

	state = (0, _reducer2.default)(state, (0, _actions.setInfo)({ text: 'asdf', nextState: 'fff' }));

	t.true(state.mode === 'info');
	t.true(state.info.text === 'asdf');
	t.true(state.info.nextState === 'fff');
});

(0, _ava2.default)((0, _actions.startTest)().type, function (t) {
	var state = (0, _reducer2.default)();
	t.truthy(state.test);

	state = (0, _reducer2.default)(state, (0, _actions.startTest)([{ x: 1, y: 2 }]));

	t.true(state.mode === 'test');
	t.true(state.test.questions.length === 1);
	t.true(state.test.questions[0].x === 1);
	t.truthy(state.test.questions[0].startTime);
	t.true(state.test.questions[0].startTime <= Date.now());
});

(0, _ava2.default)((0, _actions.testCorrectAnswer)().type, function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(t) {
		var state, startTime;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						state = (0, _reducer2.default)();

						state = (0, _reducer2.default)(state, (0, _actions.startTest)([{ x: 1, y: 2, answer: '2' }, { x: 2, y: 2, answer: '4' }]));
						state = (0, _reducer2.default)(state, (0, _actions.questionInput)(state.test.questions[0].answer));
						_context.next = 5;
						return sleep();

					case 5:
						startTime = Date.now();

						state = (0, _reducer2.default)(state, (0, _actions.testCorrectAnswer)());

						t.deepEqual(state.test.questions[0], { x: 2, y: 2, answer: '4', startTime: startTime });
						t.true(state.test.answered.length === 1);
						t.truthy(state.test.answered[0].time);
						t.true(state.input === '');

						_context.next = 13;
						return sleep();

					case 13:
						state = (0, _reducer2.default)(state, (0, _actions.testCorrectAnswer)());
						t.truthy(state.test.answered[1].time);

					case 15:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x) {
		return ref.apply(this, arguments);
	};
}());

(0, _ava2.default)((0, _actions.testDone)().type, function (t) {
	var state = (0, _reducer2.default)();
	state = (0, _reducer2.default)(state, (0, _actions.startTest)([{ x: 1, y: 2, answer: '2' }, { x: 2, y: 2, answer: '4' }]));
	state = (0, _reducer2.default)(state, (0, _actions.testCorrectAnswer)());
	state = (0, _reducer2.default)(state, (0, _actions.testCorrectAnswer)());
	state = (0, _reducer2.default)(state, (0, _actions.testDone)());

	t.regex(state.info.text, /Testen er ferdig./);
});

(0, _ava2.default)((0, _actions.setQuestion)().type, function (t) {
	var state = (0, _reducer2.default)();
	t.true(state.questions.length === 100);

	state = (0, _reducer2.default)(state, (0, _actions.setQuestion)(10));

	t.true(state.currentQuestion === 10);
});

(0, _ava2.default)((0, _actions.questionInput)().type, function (t) {
	var state = (0, _reducer2.default)();
	t.true(state.input === '');

	state = (0, _reducer2.default)(state, (0, _actions.questionInput)('1'));

	t.true(state.input === '1');
});

(0, _ava2.default)((0, _actions.questionInput)().type + ': backspace', function (t) {
	var state = (0, _reducer2.default)();

	state = (0, _reducer2.default)(state, (0, _actions.questionInput)('1'));
	t.true(state.input === '1');
	state = (0, _reducer2.default)(state, (0, _actions.questionInput)('1', { name: 'backspace' }));

	t.true(state.input === '');
});

(0, _ava2.default)((0, _actions.startRound)().type, function (t) {
	var state = (0, _reducer2.default)();
	state = (0, _reducer2.default)(state, (0, _actions.startRound)());

	t.true(state.mode === 'round');
});

// test('Moves questions upon correct answer', (t) => {
// 	let state = reducer()
// 	const questions = state.questions

// 	// move all to next bin
// 	questions.map(question => {
// 		state = reducer(state, {
// 			type: 'QUESTION',
// 			question
// 		})
// 		question.answer.split('').map(input => {
// 			state = reducer(state, {type: 'QUESTION_INPUT', input})
// 		})
// 	})

// 	t.true(state.bins[0].length === 0)

// 	// move one to next bin
// 	state = reducer(state, {
// 		type: 'QUESTION',
// 		question: state.bins[1][10]
// 	})
// 	state.question.answer.split('').map(input => {
// 		state = reducer(state, {type: 'QUESTION_INPUT', input})
// 	})

// 	t.true(state.bins[0].length === 0)
// 	t.true(state.bins[1].length === 99)
// 	t.true(state.bins[2].length === 1)
// })

function sleep() {
	var time = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}
//# sourceMappingURL=reducer.test.js.map