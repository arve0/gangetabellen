
export function testMode () {
	return { type: 'MODE', mode: 'test'	}
}

export function questionInput (input, key) {
	return { type: 'QUESTION_INPUT', input, key }
}

export function setQuestion (question) {
	return { type: 'QUESTION', question }
}
