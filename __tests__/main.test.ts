import { PassThrough } from 'stream'
import { startApplication } from '../src/main'
import { calculateResultOfRomanNumerals } from '../src/util'

let mockedStream!: PassThrough
const consoleSpy = jest.spyOn(console, 'log')

beforeEach(() => {
	mockedStream = new PassThrough()
	startApplication({ input: mockedStream })
})

describe('Make sure the user can assign variables and get correct result', () => {
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
			'var(M)',
			'var3(L)',
			'var2(C)',
			'is not valid',
		)
	})
})

describe('Make sure the user can assign credit variables and get correct result', () => {
	test('Can assign a single normal and credit variable and get correct result', () => {
		mockedStream.emit('data', 'var is I\n')
		mockedStream.emit('data', 'var var Silver is 34 Credits\n')
		mockedStream.emit('data', 'how many Credits is var Silver ?\n')

		expect(consoleSpy).toHaveBeenCalledWith('var Silver', 'is', 17, ' Credits')
	})

	test('Can assign two normal and one credit variable and get correct result', () => {
		mockedStream.emit('data', 'var is I\n')
		mockedStream.emit('data', 'var2 is V\n')
		mockedStream.emit('data', 'var var2 Silver is 34 Credits\n')
		mockedStream.emit('data', 'how many Credits is var Silver ?\n')

		expect(consoleSpy).toHaveBeenCalledWith('var Silver', 'is', 8.5, ' Credits')
	})

	test('Can assign a single normal and one credit variable and get correct result', () => {
		mockedStream.emit('data', 'var is I\n')
		mockedStream.emit('data', 'var2 is V\n')
		mockedStream.emit('data', 'var3 is L\n')
		mockedStream.emit('data', 'var3 var var2 Silver is 54 Credits\n')
		mockedStream.emit('data', 'how many Credits is var3 var Silver ?\n')

		expect(consoleSpy).toHaveBeenCalledWith(
			'var3 var Silver',
			'is',
			51,
			' Credits',
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
