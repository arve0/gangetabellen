'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _generateQuestions = require('./generateQuestions.js');

var _generateQuestions2 = _interopRequireDefault(_generateQuestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
	// five bins with questions
	bins: [(0, _generateQuestions2.default)(), [], [], [], []],
	question: {},
	info: { text: '' },
	test: {},
	mode: '',
	input: ''
};

function reducer() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	switch (action.type) {
		case 'INFO':
			return _extends({}, state, {
				mode: 'info',
				info: action.info });

		case 'MODE':
			return _extends({}, state, {
				mode: action.mode });

		case 'TEST':
			return _extends({}, state, {
				mode: 'test',
				test: action.test });

		case 'QUESTION':
			var bins = removeItemFromBins(state.bins, action.question);
			return _extends({}, state, {
				question: action.question,
				input: '',
				bins: bins });

		case 'QUESTION_INPUT':
			var numbers = '0 1 2 3 4 5 6 7 8 9'.split(' ');
			var input = state.input;
			if (action.key && action.key.name === 'backspace') {
				input = state.input.slice(0, state.input.length - 1);
			} else if (numbers.indexOf(action.input) !== -1) {
				input = state.input + action.input;
				// if correct, inc counter and add back to bin
				if (input === state.question.answer) {
					(function () {
						var correctAnswers = state.question.correctAnswers + 1;
						// TODO: do not mutate state argument
						state.question = _extends({}, state.question, { correctAnswers: correctAnswers });
						// add back to one of the bins
						state.bins = state.bins.map(function (bin, i) {
							if (i === correctAnswers) {
								return [].concat(_toConsumableArray(bin), [state.question]);
							}
							return bin;
						});
					})();
				}
			}
			return _extends({}, state, { input: input });
		default:
			return state;
	}
}

function removeItemFromBins(bins, item) {
	return bins.map(function (innerArr) {
		return innerArr.filter(function (i) {
			return i !== item;
		});
	});
}
//# sourceMappingURL=reducer.js.map