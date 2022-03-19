import * as readline from 'readline'
import { stdin as input, stdout as output } from 'process'
import {
	asksForResultOfVars,
	getResultForVars,
	isVarAssignedAsRomanNumeral,
	setVariable,
} from './src/main'
import { areValidRomanNumerals } from './src/lib'

const reader = readline.createInterface({ input, output })

reader.on('line', line => {
	if (isVarAssignedAsRomanNumeral(line)) {
		console.log('var assigned as roman')
		const inputs = line.split(' ')
		const [varName, _, romanNumeral] = inputs

		if (areValidRomanNumerals(romanNumeral)) {
			console.log('is valid')
			setVariable(varName, romanNumeral)
		} else {
			console.log('not valid')
		}
	}

	if (asksForResultOfVars(line)) {
		console.log('ask for result')
		const [_how, _much, _is, ...vars] = line.split(' ')
		console.log(vars)
		console.log(getResultForVars(vars))
	}

	if (line === 'x') {
		reader.close()
	}
})
