export const printWelcomeScreen = () => {
	console.clear()
	console.log('====================================================')
	console.log("Welcome to the merchant's guide to the galaxy!\n")
	console.log('To start, simply assign a variable to a roman numeral')
	console.log("e.g. 'glob is I'\n")
	console.log('Then ask how much glob is')
	console.log("e.g. 'how much is glob?'\n")
	console.log(
		"Note that you can repeat the same variable as many times as you\nwant as long it's valid",
	)
	console.log("e.g. 'how much is glob glob glob?'\n")
	console.log("To ask for help simply type 'help'")
	console.log('====================================================\n')
}

export const printHelpScreen = () => {
	console.clear()
	console.log('========================Help========================')
	console.log(
		"To assign a variable to a roman numeral simply put the variable name,\nthen 'is', then the roman numeral",
	)
	console.log("e.g. 'glob is I'\n")
	console.log(
		"To ask how much glob is simply say 'how much is' and then any number of variables",
	)
	console.log("e.g. 'how much is glob?'\n")
	console.log(
		"Assigning credits to a variable is as simple putting the\nnormal variables, then the name of the metal, then 'is' and lastly the amount of Credits",
	)
	console.log('e.g. glob glob Silver is 34 Credits\n')
	console.log(
		"To ask for the result of other variables with a metal simply say 'how many Credits is'\nand then any number of variables and lastly the metal",
	)
	console.log("e.g. 'prok is V'")
	console.log("e.g. 'how many Credits is glob prok Silver?'\n")
	console.log('========================Help========================\n')
}
