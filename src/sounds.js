import { join } from 'path'
import { exec } from 'child_process'

export function correct () {
	play('correct.wav')
}

export function wrong () {
	play('wrong.wav')
}

function play (filename) {
	const fullPath = join(__dirname, 'sounds', filename)
	exec('afplay ' + fullPath)  // osx only
}
