export const userAsksForHelp = (line: string) => {
	return line === 'help'
}

export const userAssignsVariable = (line: string) => {
	const inputs = line.split(' ')

	return inputs.length === 3 && inputs[1] === 'is'
}

export const userAssignsCredits = (line: string) => {
	if (!line.includes('is')) {
		return
	}
	const [_, credits] = line.split(' is ')
	return credits.endsWith('Credits')
}

export const userAsksForResultOfVariables = (line: string) => {
	return line.startsWith('how much is')
}

export const userAsksForAmountOfCredits = (line: string) => {
	return line.startsWith('how many Credits is')
}
