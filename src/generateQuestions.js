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
export default function generateQuestions () {
	let arr = []
	for (let x = 1; x <= 10; ++x) {
		for (let y = 1; y <= 10; ++y) {
			arr.push({
				x,
				y,
				text: `${x} x ${y} = `,
				answer: '' + x * y,  // as string
				correctAnswers: 0,
				wrongAnswers: 0
			})
		}
	}
	return arr
}
