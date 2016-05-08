'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.testMode = testMode;
exports.questionInput = questionInput;
exports.setQuestion = setQuestion;
function testMode() {
	return { type: 'MODE', mode: 'test' };
}

function questionInput(input, key) {
	return { type: 'QUESTION_INPUT', input: input, key: key };
}

function setQuestion(question) {
	return { type: 'QUESTION', question: question };
}
//# sourceMappingURL=actions.js.map