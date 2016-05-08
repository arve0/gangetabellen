const test = require('ava')
const fork = require('child_process').fork

let context
test.before((t) => {
	const CMD = 'index.js'
	// silent: true -> do not pipe child.stdout to process.stdout
	const child = fork(CMD, [], { silent: true })

	// keep output history in an array
	const stdout = []
	child.stdout.setEncoding('utf8')
	child.stdout.on('data', (d) => {
		stdout.push(d)
	})

	child.stderr.on('data', (d) => {
		throw new Error(d)
	})

	// access child and stdout array from tests
	context = { child, stdout }
})

test.after((t) => {
	// terminate child
	if (context.child.connected) {
		context.child.disconnect()
	}
})

/**
 * plan:
 * 1. keep history of data
 * 2. test length of data array
 * 3. test contents of data array
 * 4. send response
 * 5. expect new data in array
 * 6. continue
 */

/**
 * These tests will run serially.
 * You can run them concurrently by using `test((t) => { ... })`.
 */
test.serial('gets a welcome message', async (t) => {
	const { stdout } = context
	let output = await waitFor(stdout)
	// console.log(output)
	t.regex(output, 'Velkommen', 'Did not get welcome message.')
})

test.serial('gets a question after the welcome message', async (t) => {
	const { stdout, child } = context
	// press any key
	child.stdin.write('n')
	// expected: num x num =
	let output = await waitFor(stdout)
	t.notThrows(() => matchQuestion(output))
})

test.serial('if correct answer, gets a new question', async (t) => {
	const { stdout, child } = context
	// answer first question
	let firstQuestion = last(stdout)
	let answer = getAnswer(firstQuestion)
	child.stdin.write(answer)

	// get next question
	let nextQuestion = await waitFor(stdout)

	t.notThrows(() => matchQuestion(nextQuestion))
	t.true(firstQuestion != nextQuestion)
})

test.serial('initially get no more than ten questions', async (t) => {
	const { stdout, child } = context
	// answer nine questions
	for (var i = 0; i < 9; ++i) {
		output = await waitFor(stdout)
		let answer = getAnswer(output)
		child.stdin.write(answer)
	}
	output = await waitFor(stdout)
	t.throws(() => matchQuestion(output))
})

/**
 * Helper functions.
 */
function waitFor (what, timeout) {
	timeout = timeout || 1000
	let initial = what.length
	return new Promise((resolve, reject) => {
		let interval = setInterval(() => {
			if (initial !== what.length) {
				resolve(last(what))
			}
		}, 10)  // check every 10 ms
		setTimeout(reject, timeout)
	})
}

function last (arr) {
	return arr.slice(arr.length - 1)[0]
}

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
