import { RomanNumeral } from '../util'

const variableDictionary: { [value: string]: RomanNumeral[] } = {}
const metalDictionary: { [value: string]: number } = {}

export const setValueForVariable = (
	name: string,
	romanNumeral: RomanNumeral[],
) => {
	variableDictionary[name] = romanNumeral
}

export const setCreditsForMetal = (name: string, value: number) => {
	metalDictionary[name] = value
}

export const getValueForVariable = (variable: string) => {
	return variableDictionary[variable]
}

export const getCreditsForMetal = (variable: string) => {
	return metalDictionary[variable]
}
