import * as readline from 'readline'
import { stdin as input, stdout as output } from 'process'

const reader = readline.createInterface({ input, output })

reader.on('line', line => {
	if (line === 'x') {
		reader.close()
	}
})
