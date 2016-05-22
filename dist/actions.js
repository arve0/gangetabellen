'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setInfo = setInfo;
exports.startTest = startTest;
exports.testCorrectAnswer = testCorrectAnswer;
exports.testDone = testDone;
exports.startRound = startRound;
exports.questionInput = questionInput;
exports.setQuestion = setQuestion;
var INFO = exports.INFO = 'INFO';
var TEST_START = exports.TEST_START = 'TEST_START';
var TEST_CORRECT_ANSWER = exports.TEST_CORRECT_ANSWER = 'TEST_CORRECT_ANSWER';
var TEST_DONE = exports.TEST_DONE = 'TEST_DONE';
var ROUND_START = exports.ROUND_START = 'ROUND_START';
var QUESTION_INPUT = exports.QUESTION_INPUT = 'QUESTION_INPUT';
var SET_QUESTION = exports.SET_QUESTION = 'SET_QUESTION';

function setInfo(info) {
	return { type: INFO, info: info };
}

function startTest(questions) {
	return { type: TEST_START, questions: questions };
}

function testCorrectAnswer() {
	return { type: TEST_CORRECT_ANSWER };
}

function testDone() {
	return { type: TEST_DONE, text: 'Testen er ferdig.\nFra nå av må du klare regnestykkene innen __time__ sekunder får å få de godkjent.\nTrykk en tast for å fortsette.' };
}

function startRound() {
	return { type: ROUND_START };
}

function questionInput(input, key) {
	return { type: QUESTION_INPUT, input: input, key: key };
}

function setQuestion(question) {
	return { type: SET_QUESTION, question: question };
}
//# sourceMappingURL=actions.js.map