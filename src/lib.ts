import {
	areValidRomanNumerals,
	calculateResultOfRomanNumerals,
	RomanNumeral,
} from './util'

const variableDictionary: { [value: string]: RomanNumeral[] } = {}
const creditDictionary: { [value: string]: number } = {}

const IGNORED_STRINGS = ['?']

export const userAssignsVariable = (line: string) => {
	const inputs = line.split(' ')

	return inputs.length === 3 && inputs[1] === 'is'
}

export const userAssignsCredits = (line: string) => {
	if (!line.includes('is')) {
		return
	}
	const [_, credits] = line.split(' is ')
	return credits.endsWith('Credits')
}

export const calculateValueForCreditVariable = (
	credits: number,
	...vars: string[]
) => {
	const result = getResultForVars(vars)
	return credits / result
}

export const userAsksForResultOfVariables = (line: string) => {
	return line.startsWith('how much is')
}

export const userAsksForAmountOfCredits = (line: string) => {
	return line.startsWith('how many Credits is')
}

export const userAsksForHelp = (line: string) => {
	return line === 'help'
}

export const getResultForVars = (vars: string[]) => {
	const values = vars.map(getValueForVariable).flat()
	return calculateResultOfRomanNumerals(...values)
}

export const areValuesForVarsValid = (vars: string[]) => {
	return areValidRomanNumerals(vars.map(getValueForVariable).flat().join(''))
}

export const filterOutIgnoredStrings = (vars: string[]) => {
	const filteredVariables = vars.filter(
		variable => !IGNORED_STRINGS.includes(variable),
	)
	return filteredVariables.map(variable => {
		// If variable ends with any ignored string, remove it
		// Useful if the user accidentally types a question mark without spacing

		const ignoredString = IGNORED_STRINGS.find(ignoredString =>
			variable.endsWith(ignoredString),
		)
		if (!ignoredString) {
			return variable
		}
		return variable.slice(0, variable.length - ignoredString.length)
	})
}

export const getUnknownVariables = (vars: string[]) => {
	return [
		...new Set(
			vars.filter(
				variable =>
					!getValueForVariable(variable) && !getCreditsForVariable(variable),
			),
		),
	]
}

export const parseCredits = (credits: string) => {
	const [value] = credits.split(' Credits')
	if (isNaN(Number(value))) {
		throw new Error('Invalid credits amount')
	}
	return Number(value)
}

export const formatVariables = (vars: string[]) => {
	return vars.map(v => v + `(${getValueForVariable(v)})`)
}

export const setValueForVariable = (
	name: string,
	romanNumeral: RomanNumeral[],
) => {
	variableDictionary[name] = romanNumeral
}

export const setCreditsForVariable = (name: string, value: number) => {
	creditDictionary[name] = value
}

const getValueForVariable = (variable: string) => {
	return variableDictionary[variable]
}

export const getCreditsForVariable = (variable: string) => {
	return creditDictionary[variable]
}

export const printWelcomeScreen = () => {
	console.clear()
	console.log('====================================================')
	console.log("Welcome to the merchant's guide to the galaxy!\n")
	console.log('To start, simply assign a variable to a roman numeral')
	console.log("e.g. 'glob is I'\n")
	console.log('Then ask how much glob is')
	console.log("e.g. 'how much is glob?'\n")
	console.log(
		"Note that you can repeat the same variable as many times as you\nwant as long it's valid",
	)
	console.log("e.g. 'how much is glob glob glob?'\n")
	console.log("To ask for help simply type 'help'")
	console.log('====================================================\n')
}

export const printHelpScreen = () => {
	console.clear()
	console.log('========================Help========================')
	console.log(
		"To assign a variable to a roman numeral simply put the variable name,\nthen 'is', then the roman numeral",
	)
	console.log("e.g. 'glob is I'\n")
	console.log(
		"To ask how much glob is simply say 'how much is' and then any number of variables",
	)
	console.log("e.g. 'how much is glob?'\n")
	console.log(
		"Assigning credits to a variable is as simple putting the\nnormal variables, then the name of the metal, then 'is' and lastly the amount of Credits",
	)
	console.log('e.g. glob glob Silver is 34 Credits\n')
	console.log(
		"To ask for the result of other variables with a metal simply say 'how many Credits is'\nand then any number of variables and lastly the metal",
	)
	console.log("e.g. 'prok is V'")
	console.log("e.g. 'how many Credits is glob prok Silver?'\n")
	console.log('========================Help========================\n')
}
