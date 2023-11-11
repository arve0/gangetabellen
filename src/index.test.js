const test = require('ava')
const ttyTestHelper = require('tty-test-helper')

let context
test.before((t) => {
	const CMD = 'index.js'
	context = ttyTestHelper(__dirname + '/' + CMD, {
		debug: false
	})
})

test.after((t) => {
	// terminate child
	if (context.child.connected) {
		context.child.disconnect()
	}
})

/**
 * These tests will run serially.
 * You can run them concurrently by using `test((t) => { ... })`.
 */
test.serial('gets a welcome message', async (t) => {
	const { stdout, waitFor } = context
	return waitFor('Velkommen', stdout)
})

test.serial('gets a question after the welcome message', async (t) => {
	const { stdout, stdin, waitFor } = context
	// press any key
	stdin.write('n')
	// expected: num x num =
	let output = await waitFor('x')
	t.notThrows(() => matchQuestion(output))
})

test.serial('test: if correct answer, gets a new question', async (t) => {
	const { stdout, stdin, waitFor, last } = context
	// answer first question
	let firstQuestion = last(stdout)
	let answer = getAnswer(firstQuestion)
	stdin.write(answer)

	// get next question
	let nextQuestion = await waitFor('x', stdout)

	t.notThrows(() => matchQuestion(nextQuestion))
	t.true(firstQuestion != nextQuestion)
})

test.serial('test: gets median time after ten questions', async (t) => {
	const { stdout, stdin, last, wait } = context
	let output
	// answer nine questions
	for (var i = 0; i < 9; ++i) {
		output = last(stdout)
		let answer = getAnswer(output)
		stdin.write(answer)
		await wait(100)
	}
	output = last(stdout)
	t.regex(output, /regnestykkene innen 0.1 sekunder/)
	stdin.write('k')  // press a key to continue
})

test.serial('game: played in rounds of 10 questions', async (t) => {
	const { stdout, stdin, last, wait } = context
	let output
	// answer ten questions
	for (var i = 0; i < 10; ++i) {
		output = last(stdout)
		let answer = getAnswer(output)
		stdin.write(answer)
		await wait(101)
	}
	output = last(stdout)
//	t.regex(output, /Din mediantid er [0-9\.]+ sekunder/)
})

/**
 * Helper functions.
 */
function matchQuestion (q) {
	let r = new RegExp('([0-9]+) x ([0-9]+) \=')
	let m = q.match(r)
	if (!m || m.length !== 3) {
		throw new Error(q + ' not an question of the form `3 x 3 =`')
	}
	return m
}

function getAnswer (q) {
	let m = matchQuestion(q)
	return `${m[1] * m[2]}`
}
