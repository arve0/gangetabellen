'use strict';

var _redux = require('redux');

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _reducer = require('./reducer.js');

var _reducer2 = _interopRequireDefault(_reducer);

var _actions = require('./actions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducer2.default);

store.subscribe(function () {
	render(store.getState());
});

// set up console
process.stdin.setRawMode(true);
_readline2.default.emitKeypressEvents(process.stdin);

process.stdin.on('keypress', (0, _actions.questionInput)(store));
process.stdin.on('keypress', listenForCtrlC);
process.on('SIGINT', (0, _actions.exit)(store));

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

function listenForCtrlC(_, key) {
	if (key.ctrl && key.name === 'c') {
		process.kill(process.pid, 'SIGINT');
	}
}
//# sourceMappingURL=index.js.map