export const INFO = 'INFO'
export const TEST_START = 'TEST_START'
export const TEST_CORRECT_ANSWER = 'TEST_CORRECT_ANSWER'
export const TEST_DONE = 'TEST_DONE'
export const ROUND_START = 'ROUND_START'
export const QUESTION_INPUT = 'QUESTION_INPUT'
export const SET_QUESTION = 'SET_QUESTION'

export function setInfo (info) {
	return { type: INFO, info }
}

export function startTest (questions) {
	return { type: TEST_START, questions	}
}

export function testCorrectAnswer () {
	return { type: TEST_CORRECT_ANSWER }
}

export function testDone () {
	return { type: TEST_DONE, text: `Testen er ferdig.
Fra nå av må du klare regnestykkene innen __time__ sekunder får å få de godkjent.
Trykk en tast for å fortsette.` }
}

export function startRound () {
	return { type: ROUND_START }
}

export function questionInput (input, key) {
	return { type: QUESTION_INPUT, input, key }
}

export function setQuestion (question) {
	return { type: SET_QUESTION, question }
}
