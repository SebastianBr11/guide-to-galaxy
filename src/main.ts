import * as readline from 'readline'
import {
	areValuesForVarsValid,
	userAsksForResultOfVariables,
	calculateValueForCreditVariable,
	getResultForVars,
	userAssignsCredits,
	userAssignsVariable,
	parseCredits,
	setCreditVariable,
	setVariable,
} from './lib'
import { areValidRomanNumerals } from './util'

type StartApplicationProps = Pick<readline.ReadLineOptions, 'input' | 'output'>

export const startApplication = ({ input, output }: StartApplicationProps) => {
	const reader = readline.createInterface({ input, output })

	reader.on('line', line => {
		if (userAssignsVariable(line)) {
			const inputs = line.split(' ')

			// example for 'abc is M':
			// ['abc', 'is', 'M']
			const [varName, _, romanNumeral] = inputs

			if (areValidRomanNumerals(romanNumeral)) {
				setVariable(varName, romanNumeral)
			} else {
				console.log('Invalid roman numeral')
			}
			return
		}

		if (userAssignsCredits(line)) {
			// example for 'abc Silver is 3000 Credits':
			// ['abc Silver', '3000 Credits']
			const [allVariables, credits] = line.split(' is ')
			// ['Silver', ...['abc']]
			const [creditName, ...variables] = allVariables.split(' ').reverse()
			try {
				const creditsAmount = parseCredits(credits)
				const creditVariableValue = calculateValueForCreditVariable(
					creditsAmount,
					...variables,
				)
				setCreditVariable(creditName, creditVariableValue)
			} catch (e) {
				if (e instanceof Error) {
					console.log(e.message)
				}
			}
			return
		}

		if (userAsksForResultOfVariables(line)) {
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
