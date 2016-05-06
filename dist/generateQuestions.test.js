'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _generateQuestions = require('./generateQuestions.js');

var _generateQuestions2 = _interopRequireDefault(_generateQuestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('initial state', function (t) {
	var state = (0, _generateQuestions2.default)();
	t.truthy(state, 'Did not get initial state.');
	t.is(state.length, 100, 'Did not get 100 questions.');
});
//# sourceMappingURL=generateQuestions.test.js.map