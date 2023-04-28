// import libraries
const readline = require('readline');
const sendMessage = require('./services/gpt');

// Create input interface on the terminal
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Define recursive function to ask questions
function askQuestion() {
	rl.question('You: ', async (message) => {
		const response = await sendMessage(message);
		console.log(`GPT: ${response}`);
		askQuestion();
	});
}

askQuestion();