import {
	areValidRomanNumerals,
	calculateResultOfRomanNumerals,
	RomanNumeral,
} from './util'

const variableDictionary: { [value: string]: RomanNumeral } = {}
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

export const getResultForVars = (vars: string[]) => {
	const values = vars.map(getValueForVariable)
	return calculateResultOfRomanNumerals(...values)
}

export const areValuesForVarsValid = (vars: string[]) => {
	return areValidRomanNumerals(vars.map(getValueForVariable).join(''))
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
	return new Set([
		...vars.filter(
			variable =>
				!getValueForVariable(variable) && !getCreditsForVariable(variable),
		),
	])
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
	romanNumeral: RomanNumeral,
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
