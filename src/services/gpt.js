// OpenAI API Client file
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");
const openai = new OpenAIApi(new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
	organization: process.env.OPENAI_ORG_ID,
}));

// Here we set the system prompt as the first message of the conversation.
const conversation = [{
	role: 'system',
	content: 'You are a Paisa from Medellin Colombia. Speak using the Paisa dialect in english',
}];

async function sendMessage(message) {
	// Note here that the message attribute is an array of objects -> conversation object. 
	// This is the whole conversation in order to give context to the AI.
	// That's why we push the user message to the conversation array.
	conversation.push({ role: 'user', content: message });

	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo-0301",
		messages: conversation,
		temperature: 1,
		max_tokens: 200,
	});

	// Return the message returned by OpenAI deep into the response object
	return response.data.choices[0].message.content;
}

module.exports = sendMessage;
