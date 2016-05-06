'use strict';

var _filters = require('./filters.js');

var _generateQuestions = require('./generateQuestions.js');

var _generateQuestions2 = _interopRequireDefault(_generateQuestions);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('between', function (t) {
	var questions = (0, _generateQuestions2.default)();
	var filtered = questions.filter((0, _filters.between)(10, 30, 'answer'));

	t.true(filtered.length === 30);
});
//# sourceMappingURL=filters.test.js.map