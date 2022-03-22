import { RomanNumeral } from '../util'

const variableDictionary: { [value: string]: RomanNumeral[] } = {}
const creditDictionary: { [value: string]: number } = {}

export const setValueForVariable = (
	name: string,
	romanNumeral: RomanNumeral[],
) => {
	variableDictionary[name] = romanNumeral
}

export const setCreditsForVariable = (name: string, value: number) => {
	creditDictionary[name] = value
}

export const getValueForVariable = (variable: string) => {
	return variableDictionary[variable]
}

export const getCreditsForVariable = (variable: string) => {
	return creditDictionary[variable]
}
