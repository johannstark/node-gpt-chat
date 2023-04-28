# Node.js GPT Chat

A pretty simple Node.js terminal app that uses the [GPT API](https://openai.com/blog/openai-api/) to generate conversations based on user input.

## Getting Started

1. Clone the repo and run `npm install` to install the dependencies.
2. Login into OpenAI platform and get your API Key -> <https://platform.openai.com/account/api-keys>
3. Create a ´.env´ file in the root of the project and add your API Key as follows:

```env
OPENAI_API_KEY=<YOUR_API_KEY>
OPENAI_ORG_ID= <organization id is optional>
```

4. Run `npm start` to start the app.

## Customizing the conversation

The way GPT works is by completing a series of messages. These messages are stored in an array called **Conversation**. We need to persist this array during the lifetime of the app.

The **message** item must have two attributes: **role** and **content**. The *role* can be `user`, `assistant` or `system`. The *content* is the actual message as string.

```js
const conversation = [
    {role: 'user', content: 'Hello'},
    {role: 'assistant', content: 'Greetings. Is there something I can assist you with?'},
    {role: 'user', content: 'I want to buy a car'},
    {role: 'assistant', content: 'Sure. What kind of car are you looking for?'},
    // and so on...
];
```

Also, GPT models uses an initial prompt to generate the conversation with some context or parameters before the actual conversation. This is called a **System Prompt** *(that's right the 3rd role)*

For example, if i want to chat with Darth Vader from Star Wars i can set a system prompt like this:

```js
const conversation = [
    {role: 'system', 
     content: 'You are Darth Vader from Star Wars and always order to search for the rebel base.'
    }
```

This will likely result on messages like these:

```txt
You: Hello

GPT: Greetings. Is there something I can assist you with? Perhaps an order to locate the rebel base? As you know, we need to locate their hidden location and put an end to their efforts to overthrow the galactic empire.

You: I'm searching for Luke Skywalker

GPT: Greetings. I am Darth Vader, Dark Lord of the Sith. While it is true that we seek information on the location of the Rebel base, Luke Skywalker has not been our primary focus. However, if you have any information regarding his whereabouts or his recent activity with the Rebel Alliance, I urge you to share it with me immediately. Skywalker poses a major threat to our efforts to restore order throughout the Empire, and we must do everything in our power to locate and capture him.".

```



We can also play with two other parameters: **Temperature** and **Max Tokens**. Temperature is a value between 0 and 2 that controls the randomness of the generated text. Max Tokens can be used to limit the length of the generated text.

You can also set which **model** to use in the conversation. *(GPT-3, GPT-4 or its variants)*

These parameters are set when creating the ChatCompletion object `(./services/gpt.js)`:

```js
const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: conversation,  // Here's our conversation array
    temperature: 1.5,
    max_tokens: 100,
 });
```

Enjoy!

***
Created with love <3 by [Johannstark](https://github.com/johannstark) in Colombia :colombia:
