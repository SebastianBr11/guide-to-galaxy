import * as readline from 'readline'
import {
	areValuesForVarsValid,
	userAsksForResultOfVariables,
	calculateValueForCreditVariable,
	getResultForVars,
	userAssignsCredits,
	userAssignsVariable,
	parseCredits,
	setCreditsForVariable,
	setValueForVariable,
	userAsksForAmountOfCredits,
	filterOutIgnoredStrings,
	getUnknownVariables,
	getCreditsForVariable,
	formatVariables,
} from './lib'
import { parseRomanNumeral } from './util'

type StartApplicationProps = Pick<readline.ReadLineOptions, 'input' | 'output'>

export const startApplication = ({ input, output }: StartApplicationProps) => {
	const reader = readline.createInterface({ input, output })

	reader.on('line', line => {
		const formattedLine = line.trim()
		if (userAssignsVariable(formattedLine)) {
			const inputs = formattedLine.split(' ')

			// example for 'abc is M':
			// ['abc', 'is', 'M']
			const [varName, _, romanNumerals] = inputs

			try {
				const parsedNumerals = romanNumerals.split('').map(parseRomanNumeral)
				setValueForVariable(varName, parsedNumerals)
			} catch (e) {
				if (e instanceof Error) {
					console.log('Invalid roman numeral')
				}
			}
			return
		}

		if (userAssignsCredits(formattedLine)) {
			// example for 'abc Silver is 3000 Credits':
			// ['abc Silver', '3000 Credits']
			const [allVariables, credits] = formattedLine.split(' is ')
			// ['Silver', ...['abc']]
			const [creditName, ...variables] = allVariables.split(' ').reverse()

			const unknownVariables = getUnknownVariables(variables)

			if (unknownVariables.length > 0) {
				console.log('Unknown variables', ...unknownVariables)
				return
			}

			if (variables.length === 0) {
				console.log('You need to have at least one normal variable')
				return
			}

			try {
				const creditsAmount = parseCredits(credits)
				const creditVariableValue = calculateValueForCreditVariable(
					creditsAmount,
					...[...variables].reverse(),
				)
				setCreditsForVariable(creditName, creditVariableValue)
			} catch (e) {
				if (e instanceof Error) {
					console.log(e.message)
				}
			}
			return
		}

		if (userAsksForResultOfVariables(formattedLine)) {
			const [_how, _much, _is, ...vars] = formattedLine.split(' ')
			const filteredVariables = filterOutIgnoredStrings(vars)
			const unknownVariables = getUnknownVariables(filteredVariables)

			if (unknownVariables.length !== 0) {
				console.log('Unknown variables', ...unknownVariables)
				return
			}

			if (areValuesForVarsValid(filteredVariables)) {
				console.log(
					...filteredVariables,
					'is',
					getResultForVars(filteredVariables),
				)
			} else {
				console.log(...formatVariables(vars), 'is not valid')
			}
			return
		}

		if (userAsksForAmountOfCredits(formattedLine)) {
			const [_how, _many, _Credits, _is, ...vars] = formattedLine.split(' ')
			const filteredVariables = filterOutIgnoredStrings(vars)
			const unknownVariables = getUnknownVariables(filteredVariables)

			if (unknownVariables.length > 0) {
				console.log('Unknown variables', ...unknownVariables)
				return
			}

			const [creditName, ...variables] = [...filteredVariables].reverse()
			const result =
				getCreditsForVariable(creditName) *
				getResultForVars([...variables].reverse())
			console.log(filteredVariables.join(' '), 'is', result, ' Credits')
			return
		}

		if (formattedLine === 'x') {
			reader.close()
			return
		}

		console.log('I have no idea what you are talking about')
	})
}
