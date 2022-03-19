import { calculateResultOfRomanNumerals, RomanNumeral } from './lib'

const dictionary: { [value: string]: RomanNumeral } = {}

export const isVarAssignedAsRomanNumeral = (line: string) => {
	const inputs = line.split(' ')

	return inputs.length === 3
}

export const asksForResultOfVars = (line: string) => {
	return line.startsWith('how much is')
}

export const getResultForVars = (vars: string[]) => {
	const values = vars.map(getVariable)
	return calculateResultOfRomanNumerals(...values)
}

export const setVariable = (name: string, romanNumeral: RomanNumeral) => {
	dictionary[name] = romanNumeral
}

const getVariable = (variable: string) => {
	return dictionary[variable]
}
