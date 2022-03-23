import * as readline from 'readline'
import {
	printError,
	printHelpScreen,
	printWarning,
	printWelcomeScreen,
} from './lib/printing'
import {
	getCreditsForMetal,
	setCreditsForMetal,
	setValueForVariable,
} from './lib/storage'
import {
	userAsksForAmountOfCredits,
	userAsksForHelp,
	userAsksForResultOfVariables,
	userAssignsMetal,
	userAssignsVariable,
} from './lib/user-actions'
import {
	areValuesForVarsValid,
	calculateCreditsForMetal,
	getResultForVars,
	parseCredits,
	filterOutIgnoredStrings,
	getUnknownVariables,
	formatVariables,
} from './lib/variables'
import { parseRomanNumeral } from './util'

type StartApplicationProps = Pick<readline.ReadLineOptions, 'input' | 'output'>

export const startApplication = ({ input, output }: StartApplicationProps) => {
	const reader = readline.createInterface({ input, output })

	printWelcomeScreen()

	reader.on('line', line => {
		const formattedLine = line.trim()

		if (userAsksForHelp(formattedLine)) {
			printHelpScreen()
			return
		}

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
					printError(e.message)
				}
			}
			return
		}

		if (userAssignsMetal(formattedLine)) {
			// example for 'abc Silver is 3000 Credits':
			// ['abc Silver', '3000 Credits']
			const [allVariables, credits] = formattedLine.split(' is ')
			// ['Silver', ...['abc']]
			const [creditName, ...variables] = allVariables.split(' ').reverse()

			const unknownVariables = getUnknownVariables(variables)

			if (unknownVariables.length > 0) {
				printError('Unknown variables', ...unknownVariables)
				return
			}

			if (variables.length === 0) {
				printError('You need to have at least one normal variable')
				return
			}

			try {
				const creditsAmount = parseCredits(credits)
				const metalValue = calculateCreditsForMetal(
					creditsAmount,
					...[...variables].reverse(),
				)
				setCreditsForMetal(creditName, metalValue)
			} catch (e) {
				if (e instanceof Error) {
					printError(e.message)
				}
			}
			return
		}

		if (userAsksForResultOfVariables(formattedLine)) {
			const [_how, _much, _is, ...vars] = formattedLine.split(' ')
			const filteredVariables = filterOutIgnoredStrings(vars)
			const unknownVariables = getUnknownVariables(filteredVariables)

			if (unknownVariables.length !== 0) {
				printError('Unknown variables', ...unknownVariables)
				return
			}

			if (areValuesForVarsValid(filteredVariables)) {
				console.log(
					...filteredVariables,
					'is',
					getResultForVars(filteredVariables),
				)
			} else {
				printError(...formatVariables(vars), 'is not valid')
			}
			return
		}

		if (userAsksForAmountOfCredits(formattedLine)) {
			const [_how, _many, _Credits, _is, ...vars] = formattedLine.split(' ')
			const filteredVariables = filterOutIgnoredStrings(vars)
			const unknownVariables = getUnknownVariables(filteredVariables)

			if (unknownVariables.length > 0) {
				printError('Unknown variables', ...unknownVariables)
				return
			}

			const [metalName, ...variables] = [...filteredVariables].reverse()
			const result =
				getCreditsForMetal(metalName) *
				getResultForVars([...variables].reverse())
			console.log(filteredVariables.join(' '), 'is', result, ' Credits')
			return
		}

		if (formattedLine === 'x') {
			reader.close()
			return
		}

		if (formattedLine.length === 0) return

		printWarning('I have no idea what you are talking about')
	})
}
