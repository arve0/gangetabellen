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
		var _store$getState = store.getState();

		var mode = _store$getState.mode;

		if (mode === 'info') {
			pickNextQuestion();
		} else {
			store.dispatch({ type: 'INPUT', input: str, key: key });

			var _store$getState2 = store.getState();

			var input = _store$getState2.input;
			var question = _store$getState2.question;

			if (input === question.answer) {
				pickNextQuestion();
			}
		}
	};
}

function pickNextQuestion() {
	var _store$getState3 = store.getState();

	var bins = _store$getState3.bins;

	var randomQuestion = Math.floor(bins[0].length * Math.random());
	store.dispatch({
		type: 'QUESTION',
		question: bins[0][randomQuestion]
	});
}

// start game
store.dispatch({
	type: 'INFO',
	info: {
		text: 'Velkommen. Før vi starter, skal vi ta en test for å se hvor rask du er. Trykk på en knapp for å fortsette.'
	}
});

function render(_ref) {
	var mode = _ref.mode;
	var input = _ref.input;
	var question = _ref.question;
	var info = _ref.info;

	_readline2.default.clearLine(process.stdout, 0);
	_readline2.default.cursorTo(process.stdout, 0);
	// console.log(store.getState())
	var output = void 0;
	if (mode === 'question') {
		var correct = input === question.answer ? ' ✓\n' : '';
		output = question.text + input + correct;
	} else {
		output = info.text;
	}
	process.stdout.write(output);
}
//# sourceMappingURL=index.js.map