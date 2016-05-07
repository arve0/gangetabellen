'use strict';

var readline = require('readline');

// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// })
readline.emitKeypressEvents(process.stdin);
process.stdin.on('keypress', function () {
	process.stdout.write('.');
});

process.stdin.setRawMode(true);
process.stdin.on('keypress', function (str, key) {
	if (key.ctrl && key.name === 'c') {
		process.kill(process.pid, 'SIGINT');
	}
});
//# sourceMappingURL=prompt.js.map