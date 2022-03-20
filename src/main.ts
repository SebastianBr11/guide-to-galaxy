import * as readline from 'readline'
import {
	areValuesForVarsValid,
	asksForResultOfVars,
	calculateValueForCreditVariable,
	getResultForVars,
	isVarAssignedAsCredits,
	isVarAssignedAsRomanNumeral,
	parseCredits,
	setCreditVariable,
	setVariable,
} from './lib'
import { areValidRomanNumerals } from './util'

interface StartApplicationProps
	extends Pick<readline.ReadLineOptions, 'input' | 'output'> {}

export const startApplication = ({ input, output }: StartApplicationProps) => {
	const reader = readline.createInterface({ input, output })

	reader.on('line', line => {
		if (isVarAssignedAsRomanNumeral(line)) {
			const inputs = line.split(' ')
			const [varName, _, romanNumeral] = inputs

			if (areValidRomanNumerals(romanNumeral)) {
				setVariable(varName, romanNumeral)
			} else {
				console.log('Invalid roman numeral')
			}
			return
		}

		if (isVarAssignedAsCredits(line)) {
			const [vars, credits] = line.split(' is ')
			const [creditVariable, ...variables] = vars.split(' ').reverse()
			try {
				const creditsAmount = parseCredits(credits)
				const creditVariableValue = calculateValueForCreditVariable(
					creditsAmount,
					...variables,
				)
				setCreditVariable(creditVariable, creditVariableValue)
			} catch (e) {
				if (e instanceof Error) {
					console.log(e.message)
				}
			}
			return
		}

		if (asksForResultOfVars(line)) {
			console.log('ask for result')
			const [_how, _much, _is, ...vars] = line.split(' ')
			if (areValuesForVarsValid(vars)) {
				console.log(...vars, 'is', getResultForVars(vars))
			} else {
				console.log(...vars, 'is not valid')
			}
			return
		}

		if (line === 'x') {
			reader.close()
			return
		}
		console.log('I have no idea what you are talking about')
	})
}
