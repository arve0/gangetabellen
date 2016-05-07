import { join } from 'path'
import { exec } from 'child_process'

export function correct () {
	play('correct.mp3')
}

export function wrong () {
	play('wrong.mp3')
}

function play (filename) {
	const fullPath = join(__dirname, 'sounds', filename)
	exec('afplay ' + fullPath)  // osx only
}
