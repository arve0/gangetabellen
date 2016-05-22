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
		console.log(d)
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
 * These tests will run serially.
 * You can run them concurrently by using `test((t) => { ... })`.
 */
test.serial('gets a welcome message', async (t) => {
	const { stdout } = context
	return waitFor('Velkommen', stdout)
})

test.serial('gets a question after the welcome message', async (t) => {
	const { stdout, child } = context
	// press any key
	child.stdin.write('n')
	// expected: num x num =
	let output = await waitFor('x', stdout)
	t.notThrows(() => matchQuestion(output))
})

test.serial('test: if correct answer, gets a new question', async (t) => {
	const { stdout, child } = context
	// answer first question
	let firstQuestion = last(stdout)
	let answer = getAnswer(firstQuestion)
	child.stdin.write(answer)

	// get next question
	let nextQuestion = await waitFor('x', stdout)

	t.notThrows(() => matchQuestion(nextQuestion))
	t.true(firstQuestion != nextQuestion)
})

test.serial('test: gets median time after ten questions', async (t) => {
	const { stdout, child } = context
	let output
	// answer nine questions
	for (var i = 0; i < 9; ++i) {
		output = last(stdout)
		let answer = getAnswer(output)
		child.stdin.write(answer)
		await sleep(100)
	}
	output = last(stdout)
	t.regex(output, /regnestykkene innen 0.1 sekunder/)
	child.stdin.write('k')  // press a key to continue
})

test.serial('game: played in rounds of 10 questions', async (t) => {
	const { stdout, child } = context
	let output
	// answer ten questions
	for (var i = 0; i < 10; ++i) {
		output = last(stdout)
		let answer = getAnswer(output)
		child.stdin.write(answer)
		await sleep(101)
	}
	output = last(stdout)
//	t.regex(output, /Din mediantid er [0-9\.]+ sekunder/)
})

/**
 * Helper functions.
 */
function waitFor (what = '', where = [], onlyNew = false, timeout = 1000) {
	return new Promise((resolve, reject) => {
		let t, i, l
		// check every 10 ms
		if (onlyNew) {
			l = what.length
		}
		i = setInterval(() => {
			if (onlyNew && what.length === l) {
				return
			}
			if (last(where) && last(where).indexOf(what) !== -1) {
				clearTimeout(t)
				clearInterval(i)
				resolve(last(where))
			}
		}, 10)
		// or time out
		t = setTimeout(() => {
			clearInterval(i)
			reject(`timed out after ${timeout} milliseconds, did not find "${what}" in "${last(where)}"`)
		}, timeout)
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

function sleep (time = 1) {
	return new Promise((resolve) => {
		setTimeout(resolve, time)
	})
}
