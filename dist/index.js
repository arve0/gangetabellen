'use strict';

var _redux = require('redux');

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _reducer = require('./reducer.js');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducer2.default);

store.subscribe(function () {
	render(store.getState());
});

// set up console
var rl = _readline2.default.createInterface(process.stdin, process.stdout);
_readline2.default.emitKeypressEvents(process.stdin);

process.stdin.on('keypress', registerInput(store));
rl.on('close', function () {
	var state = store.getState();
	console.log('\nGot ' + state.bins[1].length + ' correct ones.');
});

function registerInput(store) {
	return function (str, key) {
		store.dispatch({ type: 'INPUT', input: str, key: key });

		var _store$getState = store.getState();

		var input = _store$getState.input;
		var question = _store$getState.question;

		if (input === question.answer) {
			pickNextQuestion();
		}
	};
}

function render(_ref) {
	var input = _ref.input;
	var question = _ref.question;

	_readline2.default.clearLine(process.stdout, 0);
	_readline2.default.cursorTo(process.stdout, 0);
	var correct = input === question.answer ? ' ✓\n' : '';
	var output = question.text + input + correct;
	process.stdout.write(output);
}

function pickNextQuestion() {
	var _store$getState2 = store.getState();

	var bins = _store$getState2.bins;

	var randomQuestion = Math.floor(bins[0].length * Math.random());
	store.dispatch({
		type: 'PICK_QUESTION',
		question: bins[0][randomQuestion]
	});
}

// start game
pickNextQuestion();
//# sourceMappingURL=index.js.map