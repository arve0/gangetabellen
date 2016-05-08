'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _generateQuestions = require('./generateQuestions.js');

var _generateQuestions2 = _interopRequireDefault(_generateQuestions);

var _filters = require('./filters.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('picks test questions', function (t) {
	var questions = (0, _generateQuestions2.default)();
	questions = questions.filter(_filters.getTestQuestions);
	t.true(questions.length === 38);
});
//# sourceMappingURL=filters.test.js.map