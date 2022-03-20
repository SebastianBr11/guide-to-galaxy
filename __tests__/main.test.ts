import { PassThrough } from 'stream'
import { startApplication } from '../src/main'
import { calculateResultOfRomanNumerals } from '../src/util'

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

describe('Make sure one can assign variables and get correct result', () => {
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

const messageForOtherInputs = 'I have no idea what you are talking about'

test(`Make sure to answer with '${messageForOtherInputs}' for unknown inputs`, () => {
	mockedStream.emit(
		'data',
		'how much wood could a woodchuck chuck if a woodchuck could chuck wood?\n',
	)

	expect(consoleSpy).toHaveBeenCalledWith(messageForOtherInputs)

	mockedStream.emit('data', 'what is the meaning of life?\n')

	expect(consoleSpy).toHaveBeenCalledWith(messageForOtherInputs)

	mockedStream.emit('data', 'what is 1 + 1?\n')

	expect(consoleSpy).toHaveBeenCalledWith(messageForOtherInputs)
})
