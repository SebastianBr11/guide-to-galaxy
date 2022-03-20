import { PassThrough } from 'stream'
import { startApplication } from '../src/main'
import { calculateResultOfRomanNumerals } from '../src/util'

describe('Make sure one can assign variables and get correct result', () => {
	let mockedStream!: PassThrough
	let consoleSpy!: jest.SpyInstance<
		void,
		[message?: any, ...optionalParams: any[]]
	>

	beforeEach(() => {
		mockedStream = new PassThrough()
		startApplication({ input: mockedStream })
		consoleSpy = jest.spyOn(console, 'log')
	})

	test('Can assign a single variable and get correct result', () => {
		mockedStream.emit('data', 'var is M\n')
		mockedStream.emit('data', 'how much is var\n')

		expect(consoleSpy).toHaveBeenCalledWith(
			'var',
			'is',
			calculateResultOfRomanNumerals('M'),
		)
	})

	test('Can assign two variables and get correct result', () => {
		mockedStream.emit('data', 'var is M\n')
		mockedStream.emit('data', 'var2 is C\n')
		mockedStream.emit('data', 'how much is var var2\n')

		expect(consoleSpy).toHaveBeenCalledWith(
			'var',
			'var2',
			'is',
			calculateResultOfRomanNumerals('M', 'C'),
		)
	})

	test('Can assign three variables and get correct result', () => {
		mockedStream.emit('data', 'var is M\n')
		mockedStream.emit('data', 'var2 is X\n')
		mockedStream.emit('data', 'var3 is I\n')
		mockedStream.emit('data', 'how much is var var3 var2\n')

		expect(consoleSpy).toHaveBeenCalledWith(
			'var',
			'var3',
			'var2',
			'is',
			calculateResultOfRomanNumerals('M', 'I', 'X'),
		)
	})

	test("Can't get result with invalid roman numerals with three variables", () => {
		mockedStream.emit('data', 'var is M\n')
		mockedStream.emit('data', 'var2 is C\n')
		mockedStream.emit('data', 'var3 is L\n')
		mockedStream.emit('data', 'how much is var var3 var2\n')

		expect(consoleSpy).toHaveBeenCalledWith(
			'var',
			'var3',
			'var2',
			'is not valid',
		)
	})
})
