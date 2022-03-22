export const romanNumberRepresentation = {
	I: 1,
	V: 5,
	X: 10,
	L: 50,
	C: 100,
	D: 500,
	M: 1_000,
} as const

type RomanNumberRepresentation = typeof romanNumberRepresentation

export type RomanNumeral = keyof RomanNumberRepresentation
type ArabicNumber = RomanNumberRepresentation[RomanNumeral]

export const getNumberFromRomanNumeral = (
	romanNumeral: RomanNumeral,
): ArabicNumber => {
	return romanNumberRepresentation[romanNumeral]
}

export const calculateResultOfRomanNumerals = (
	...romanNumerals: RomanNumeral[]
) => {
	return romanNumerals
		.map(getNumberFromRomanNumeral)
		.reduce((acc, currNumber, index, arr) => {
			const prevNumber = arr[index - 1]

			if (prevNumber < currNumber) {
				return acc + currNumber - prevNumber - prevNumber
			}

			return acc + currNumber
		}, 0)
}

export const areValidRomanNumerals = (
	numerals: string,
): numerals is RomanNumeral => {
	const validator = new RegExp(
		/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,
	)
	return validator.test(numerals)
}

export const parseRomanNumeral = (numerals: string): RomanNumeral => {
	if (areValidRomanNumerals(numerals)) {
		return numerals
	}
	throw new Error('Roman Numerals are invalid')
}
