import { calculateResultOfRomanNumerals } from '../src/lib'

describe('Make sure the calculation of roman numerals works correctly', () => {
	test('Calculates the sum correctly when numerals are in order from highest to lowest', () => {
		const sum1 = calculateResultOfRomanNumerals('M', 'M', 'V', 'I')
		const sum2 = calculateResultOfRomanNumerals('C', 'C', 'V', 'I', 'I')
		const sum3 = calculateResultOfRomanNumerals(
			'M',
			'M',
			'M',
			'D',
			'C',
			'C',
			'C',
			'L',
			'X',
			'X',
			'X',
			'V',
			'I',
			'I',
			'I',
		)

		expect(sum1).toEqual(2006)
		expect(sum2).toEqual(207)
		expect(sum3).toEqual(3888)
	})

	test('Calculates the result correctly when numerals are not in order from highest to lowest', () => {
		const sum1 = calculateResultOfRomanNumerals(
			'M',
			'M',
			'C',
			'D',
			'X',
			'X',
			'I',
		)
		const sum2 = calculateResultOfRomanNumerals(
			'M',
			'C',
			'M',
			'X',
			'L',
			'I',
			'V',
		)
		const sum3 = calculateResultOfRomanNumerals('M', 'C', 'M', 'I', 'I', 'I')

		expect(sum1).toEqual(2421)
		expect(sum2).toEqual(1944)
		expect(sum3).toEqual(1903)
	})
})
