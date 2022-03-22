import chalk from 'chalk'

const formatForError = chalk.bold.bgHex('#581414')

const formatForWarning = chalk.bold.yellow

export const printError = (...messages: string[]) => {
	console.log(formatForError(...messages))
}

export const printWarning = (...messages: string[]) => {
	console.log(formatForWarning(...messages))
}

const formatForHelp = chalk.blueBright

const printHelp = (...messages: string[]) => {
	console.log(formatForHelp(...messages))
}

export const printWelcomeScreen = () => {
	console.clear()
	printHelp('====================================================')
	printHelp("Welcome to the merchant's guide to the galaxy!\n")
	printHelp('To start, simply assign a variable to a roman numeral')
	printHelp("e.g. 'glob is I'\n")
	printHelp('Then ask how much glob is')
	printHelp("e.g. 'how much is glob?'\n")
	printHelp(
		"Note that you can repeat the same variable as many times as you\nwant as long it's valid",
	)
	printHelp("e.g. 'how much is glob glob glob?'\n")
	printHelp("To ask for help simply type 'help'")
	printHelp('====================================================\n')
}

export const printHelpScreen = () => {
	console.clear()
	printHelp('========================Help========================')
	printHelp(
		"To assign a variable to a roman numeral simply put the variable name,\nthen 'is', then the roman numeral",
	)
	printHelp("e.g. 'glob is I'\n")
	printHelp(
		"To ask how much glob is simply say 'how much is' and then any number of variables",
	)
	printHelp("e.g. 'how much is glob?'\n")
	printHelp(
		"Assigning credits to a variable is as simple putting the\nnormal variables, then the name of the metal, then 'is' and lastly the amount of Credits",
	)
	printHelp('e.g. glob glob Silver is 34 Credits\n')
	printHelp(
		"To ask for the result of other variables with a metal simply say 'how many Credits is'\nand then any number of variables and lastly the metal",
	)
	printHelp("e.g. 'prok is V'")
	printHelp("e.g. 'how many Credits is glob prok Silver?'\n")
	printHelp('========================Help========================\n')
}
