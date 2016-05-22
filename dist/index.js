'use strict';

var _redux = require('redux');

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _reducer = require('./reducer.js');

var _reducer2 = _interopRequireDefault(_reducer);

var _inputHandlers = require('./inputHandlers.js');

var _actions = require('./actions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducer2.default);

store.subscribe(function () {
	render(store.getState());
});

// set up console
if (process.stdin.isTTY) {
	// not TTY if spawn from another node process
	process.stdin.setRawMode(true);
}
_readline2.default.emitKeypressEvents(process.stdin);

process.stdin.on('keypress', (0, _inputHandlers.inputHandler)(store));
process.on('SIGINT', exit(store));

// start game
store.dispatch((0, _actions.setInfo)({
	text: 'Velkommen!\nFør vi starter, skal vi ta en test for å se hvor rask du er.\nTrykk på en knapp for å fortsette.',
	nextState: 'test'
}));

function render(_ref) {
	var mode = _ref.mode;
	var input = _ref.input;
	var question = _ref.question;
	var info = _ref.info;
	var test = _ref.test;

	_readline2.default.clearLine(process.stdout, 0);
	_readline2.default.cursorTo(process.stdout, 0);
	// console.log(store.getState())
	var output = void 0;
	if (mode === 'info') {
		output = info.text;
	} else if (mode === 'test' && test.questions[0]) {
		var q = test.questions[0];
		var correct = input === q.answer ? ' ✓\n' : '';
		output = q.text + input + correct;
	} else if (mode === 'question') {
		var _correct = input === question.answer ? ' ✓\n' : '';
		output = question.text + input + _correct;
	} else {
		output = '';
	}
	process.stdout.write(output);
}

function exit(store) {
	return function () {
		var c = store.getState().questions.reduce(function (sum, q) {
			return q.correctAnswers;
		}, 0);
		console.log('\nGot ' + c + ' correct' + (c > 1 ? ' ones' : '') + '.');
		process.exit();
	};
}
//# sourceMappingURL=index.js.map