'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _generateQuestions = require('./generateQuestions.js');

var _generateQuestions2 = _interopRequireDefault(_generateQuestions);

var _actions = require('./actions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
	mode: '',
	info: { text: '' },
	test: { questions: [], answered: [], timeGoal: 0 },
	questions: (0, _generateQuestions2.default)(),
	currentQuestion: 0,
	input: ''
};

function reducer() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	switch (action.type) {
		case _actions.INFO:
			return _extends({}, state, {
				mode: 'info',
				info: action.info });

		case _actions.TEST_START:
			return _extends({}, state, {
				mode: 'test',
				test: _extends({}, state.test, {
					// TODO: move Date.now() to action
					questions: action.questions.map(function (q, i) {
						return i === 0 ? _extends({}, q, { startTime: Date.now() }) : q;
					})
				})
			});

		case _actions.TEST_CORRECT_ANSWER:
			var questions = state.test.questions.map(function (q, i) {
				if (i === 1) {
					// TODO: move Date.now() to action
					return _extends({}, q, { startTime: Date.now() });
				}
				return q;
			});
			return _extends({}, state, {
				input: '',
				test: {
					answered: [].concat(_toConsumableArray(state.test.answered), [getAnsweredQuestion(state.test.questions)]),
					questions: questions.slice(1)
				}
			});

		case _actions.TEST_DONE:
			// in seconds, example 3.5
			var time = median(state.test.answered.map(function (q) {
				return q.time;
			}));
			return _extends({}, state, {
				mode: 'info',
				timeGoal: time,
				info: {
					text: action.text.replace(/__time__/g, (time / 1000).toFixed(1)),
					nextState: 'round'
				}
			});

		case _actions.ROUND_START:
			return _extends({}, state, {
				mode: 'round'
			});

		case _actions.SET_QUESTION:
			return _extends({}, state, {
				currentQuestion: action.question,
				input: '' });

		case _actions.QUESTION_INPUT:
			var numbers = '0 1 2 3 4 5 6 7 8 9'.split(' ');
			var input = state.input;
			if (action.key && action.key.name === 'backspace') {
				input = state.input.slice(0, state.input.length - 1);
			} else if (numbers.indexOf(action.input) !== -1) {
				input = state.input + action.input;
			}
			return _extends({}, state, { input: input });
		default:
			return state;
	}
}

function getAnsweredQuestion(questions) {
	var answered = _extends({}, questions[0]); // copy
	// TODO: move Date.now() to action
	answered.time = Math.abs(Date.now() - answered.startTime); // absolute, in case of jump in time
	delete answered.startTime;
	return answered;
}

function median() {
	var numbers = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	var n = [].concat(_toConsumableArray(numbers)).sort();
	var middle = Math.floor(n.length / 2);
	// odd -> return middle, even -> return average of middle
	return middle !== n.length / 2 ? n[middle] : (n[middle - 1] + n[middle]) / 2;
}
//# sourceMappingURL=reducer.js.map