'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _actions = require('./actions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('testMode', function (t) {
	var action = (0, _actions.testMode)();
	t.true(action.type === 'MODE');
	t.true(action.mode === 'test');
});

(0, _ava2.default)('questionInput', function (t) {
	var key = {};
	var action = (0, _actions.questionInput)('a', key);
	t.true(action.type === 'QUESTION_INPUT');
	t.true(action.input === 'a');
	t.true(action.key === key);
});

(0, _ava2.default)('setQuestion', function (t) {
	var question = {};
	var action = (0, _actions.setQuestion)(question);
	t.true(action.type === 'QUESTION');
	t.true(action.question === question);
});
//# sourceMappingURL=actions.test.js.map