import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import "dotenv/config";
import {
	Ollama,
	storageContextFromDefaults,
	VectorStoreIndex,
	ContextChatEngine,
} from "llamaindex";

const router = express.Router();

const ollama = new Ollama({ model: "mistral", temperature: 0 });

let idMap = new Map();

const queryDocs = async (query, id) => {
	// Get the directory of the app
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	// Get the storage and create the context
	const pathStorage = path.join(__dirname, "../_storage");
	const storageContext = await storageContextFromDefaults({
		persistDir: pathStorage,
	});

	// Get an index from the existing storage
	let index = await VectorStoreIndex.init({
		storageContext,
	});

	const retriever = index.asRetriever();
	retriever.similarityTopK = 3; // How many pieces of data to return from your vector store

	// Create the chat engine with the retrieved data and the chat model
	let chatEngine = new ContextChatEngine({
		chatModel: ollama,
		retriever,
	});

	const response = await chatEngine.chat({
		message: query,
		chatHistory: idMap.get(id).messageHistory,
		stream: true,
	});

	console.log("Message history: ", idMap.get(id).messageHistory);

	return response;
};

// POST
router.post("/", async (req, res, next) => {
	console.log("Calling LLM on the backend...");
	const { query, id } = req.body;

	// Check if the id exists
	if (!idMap.has(id)) {
		console.log("New Chat ID received:", id);
		idMap.set(id, { messageHistory: [] });
	}

	const stream = await queryDocs(query, id);

	res.status(200);
	// Stream the response
	for await (const data of stream) {
		res.write(data.response || "");
	}
	res.end();
});

export default router;
