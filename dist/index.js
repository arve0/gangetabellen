'use strict';

var _redux = require('redux');

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _reducer = require('./reducer.js');

var _reducer2 = _interopRequireDefault(_reducer);

var _inputHandlers = require('./inputHandlers.js');

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
process.stdin.on('keypress', _inputHandlers.listenForCtrlC);
process.on('SIGINT', exit(store));

// start game
store.dispatch({
	type: 'INFO',
	info: {
		text: 'Velkommen!\nFør vi starter, skal vi ta en test for å se hvor rask du er.\nTrykk på en knapp for å fortsette.'
	}
});

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
	switch (mode) {
		case 'info':
			output = info.text;
			break;
		case 'test': // same as question
		case 'question':
			var correct = input === question.answer ? ' ✓\n' : '';
			output = question.text + input + correct;
			break;
		default:
			output = '';
	}
	process.stdout.write(output);
}

function exit(store) {
	return function () {
		var l = store.getState().bins[1].length;
		console.log('\nGot ' + l + ' correct' + (l > 1 ? ' ones' : '') + '.');
		process.exit();
	};
}
//# sourceMappingURL=index.js.map