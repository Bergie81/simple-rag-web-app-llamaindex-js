import "dotenv/config";
import {
	Document,
	VectorStoreIndex,
	SimpleDirectoryReader,
	RouterQueryEngine,
	storageContextFromDefaults,
	ContextChatEngine,
} from "llamaindex";

// 1. PERSISTING YOUR DATA IN A LOCAL VECTOR STORE

// Create a storage context
const storageContext = await storageContextFromDefaults({
	persistDir: "./storage",
});

/* // Load the data and create an index
const documents = await new SimpleDirectoryReader().loadData({
	directoryPath: "../src/data", // we have the React wikipedia page in here
});
let index = await VectorStoreIndex.fromDocuments(documents, {
	storageContext,
}); */
// Or get an index without parsing the documents (storage already exists)
// Only initialize an index
let index = await VectorStoreIndex.init({
	storageContext,
});

// 2 CHATTING WITH YOUR DATA TO ASK FOLLOW-UP QUESTIONS
const retriever = index.asRetriever();
retriever.similarityTopK = 3; // How many pieces of data to return from your vector store

let chatEngine = new ContextChatEngine({
	retriever,
});

// Create a message history to ask follow-up questions
let messageHistory = [
	{
		role: "user",
		content:
			"How many cycles are run for the amplification in the program setup?",
	},
	{
		role: "assistant",
		content: "50 cycles.",
	},
];

let newMessage = "What was your last answer?";

// 3. STREAMING DATA TO GIVE RESPONSES INSTANTLY
// Set stream to true
const response = await chatEngine.chat({
	message: newMessage,
	chatHistory: messageHistory,
	stream: true,
});

for await (const data of response) {
	console.log(data.response);
}
