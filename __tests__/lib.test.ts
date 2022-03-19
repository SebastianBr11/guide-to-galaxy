import {
	areValidRomanNumerals,
	calculateResultOfRomanNumerals,
} from '../src/lib'

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

describe('Make sure the validation of roman numerals works correctly', () => {
	test("Don't allow more than one D, L or V", () => {
		const areValid1 = areValidRomanNumerals('DD')
		const areValid2 = areValidRomanNumerals('DLL')
		const areValid3 = areValidRomanNumerals('MVV')
		const areValid4 = areValidRomanNumerals('MDDV')
		const areValid5 = areValidRomanNumerals('MCDD')

		expect(areValid1).toEqual(false)
		expect(areValid2).toEqual(false)
		expect(areValid3).toEqual(false)
		expect(areValid4).toEqual(false)
		expect(areValid5).toEqual(false)
	})

	test("Don't allow more than three I, X, C or M", () => {
		const areValid1 = areValidRomanNumerals('MMMM')
		const areValid2 = areValidRomanNumerals('MCCCC')
		const areValid3 = areValidRomanNumerals('DXXXX')
		const areValid4 = areValidRomanNumerals('XXXXL')
		const areValid5 = areValidRomanNumerals('LIIII')

		expect(areValid1).toEqual(false)
		expect(areValid2).toEqual(false)
		expect(areValid3).toEqual(false)
		expect(areValid4).toEqual(false)
		expect(areValid5).toEqual(false)
	})

	test('Only allow I to be subtractable from V and X', () => {
		const areValid1 = areValidRomanNumerals('IV')
		const areValid2 = areValidRomanNumerals('IX')
		const areValid3 = areValidRomanNumerals('IM')
		const areValid4 = areValidRomanNumerals('ID')
		const areValid5 = areValidRomanNumerals('IL')

		expect(areValid1).toEqual(true)
		expect(areValid2).toEqual(true)
		expect(areValid3).toEqual(false)
		expect(areValid4).toEqual(false)
		expect(areValid5).toEqual(false)
	})

	test('Only allow X to be subtractable from L and C', () => {
		const areValid1 = areValidRomanNumerals('XL')
		const areValid2 = areValidRomanNumerals('XC')
		const areValid3 = areValidRomanNumerals('XM')
		const areValid4 = areValidRomanNumerals('XD')
		const areValid5 = areValidRomanNumerals('MXL')

		expect(areValid1).toEqual(true)
		expect(areValid2).toEqual(true)
		expect(areValid3).toEqual(false)
		expect(areValid4).toEqual(false)
		expect(areValid5).toEqual(true)
	})

	test('Only allow C to be subtractable from D and M', () => {
		const areValid1 = areValidRomanNumerals('CD')
		const areValid2 = areValidRomanNumerals('CM')
		const areValid3 = areValidRomanNumerals('MCM')
		const areValid4 = areValidRomanNumerals('XCL')
		const areValid5 = areValidRomanNumerals('CIL')

		expect(areValid1).toEqual(true)
		expect(areValid2).toEqual(true)
		expect(areValid3).toEqual(true)
		expect(areValid4).toEqual(false)
		expect(areValid5).toEqual(false)
	})

	test('Never allow V, L and D to be subtractable', () => {
		const areValid1 = areValidRomanNumerals('VX')
		const areValid2 = areValidRomanNumerals('VM')
		const areValid3 = areValidRomanNumerals('LD')
		const areValid4 = areValidRomanNumerals('LM')
		const areValid5 = areValidRomanNumerals('DM')

		expect(areValid1).toEqual(false)
		expect(areValid2).toEqual(false)
		expect(areValid3).toEqual(false)
		expect(areValid4).toEqual(false)
		expect(areValid5).toEqual(false)
	})
})
