import readline from 'readline'

let input = ''
let question = 'What is the meaning of life? '

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})
readline.emitKeypressEvents(process.stdin)
process.stdin.on('keypress', registerInput)

function registerInput (str, key) {
	if (key.name === 'backspace') {
		input = input.slice(0, input.length - 1)
	} else {
		const numbers = '1 2 3 4 5 6 7 8 9 0'.split(' ')
		if (numbers.indexOf(str) !== -1) {
			input += str
		}
	}
	if (input === '42') {
		console.log(' ✓')
		input = ''
	}
	render(question, input)
}

function render (question, input) {
	readline.clearLine(process.stdout, 0)
	readline.cursorTo(process.stdout, 0)
	process.stdout.write(question + input)
}

render(question, input)
