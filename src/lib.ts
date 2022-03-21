import {
	areValidRomanNumerals,
	calculateResultOfRomanNumerals,
	RomanNumeral,
} from './util'

const variableDictionary: { [value: string]: RomanNumeral } = {}
const creditDictionary: { [value: string]: number } = {}

export const userAssignsVariable = (line: string) => {
	const inputs = line.split(' ')

	return inputs.length === 3 && inputs[1] === 'is'
}

export const userAssignsCredits = (line: string) => {
	if (!line.includes('is')) {
		return
	}
	const [_, credits] = line.split('is')
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

export const getResultForVars = (vars: string[]) => {
	const values = vars.map(getVariable)
	return calculateResultOfRomanNumerals(...values)
}

export const areValuesForVarsValid = (vars: string[]) => {
	return areValidRomanNumerals(vars.map(getVariable).join(''))
}

export const parseCredits = (credits: string) => {
	const [value] = credits.split(' Credits')
	if (isNaN(Number(value))) {
		throw new Error('Invalid credits amount')
	}
	return Number(value)
}

export const setVariable = (name: string, romanNumeral: RomanNumeral) => {
	variableDictionary[name] = romanNumeral
}

export const setCreditVariable = (name: string, value: number) => {
	creditDictionary[name] = value
}

const getVariable = (variable: string) => {
	return variableDictionary[variable]
}

const getCreditVariable = (variable: string) => {
	return creditDictionary[variable]
}
