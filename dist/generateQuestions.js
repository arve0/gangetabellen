'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = generateQuestions;
/**
 * Generate an array of questions.
 *
 * [{ x: 3
 *    y: 2,
 *    text: `2 x 3 = `,
 *    answer: '6',
 *    correctAnswers: 0,
 *    wrongAnswers: 0
 *  }, ...]
 */
function generateQuestions() {
	var arr = [];
	for (var x = 1; x <= 10; ++x) {
		for (var y = 1; y <= 10; ++y) {
			arr.push({
				x: x,
				y: y,
				text: x + ' x ' + y + ' = ',
				answer: '' + x * y, // as string
				correctAnswers: 0,
				wrongAnswers: 0
			});
		}
	}
	return arr;
}
//# sourceMappingURL=generateQuestions.js.map