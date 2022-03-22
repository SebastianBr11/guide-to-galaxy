import { areValidRomanNumerals, calculateResultOfRomanNumerals } from '../util'
import { getCreditsForVariable, getValueForVariable } from './storage'

const IGNORED_STRINGS = ['?']

export const calculateValueForCreditVariable = (
	credits: number,
	...vars: string[]
) => {
	const result = getResultForVars(vars)
	return credits / result
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
