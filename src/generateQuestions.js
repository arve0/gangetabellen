/**
 * Generate an array of questions.
 *
 * [{x: 1, y: 2, text: '1 x 2', answer: '2', correctAnswers: 0}, ...]
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
        correctAnswers: 0
      })
    }
  }
  return arr
}
