import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import "dotenv/config";
import {
	storageContextFromDefaults,
	SimpleDirectoryReader,
	VectorStoreIndex,
	ContextChatEngine,
} from "llamaindex";

const router = express.Router();

const askDocs = async (query) => {
	// Get the directory of the app
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	// Create a storage context
	const pathStorage = path.join(__dirname, "../_storage");
	const storageContext = await storageContextFromDefaults({
		persistDir: pathStorage,
	});

	/* // INFO: Run this code once to index the data and store it in the storage
	// Load the data and create an index
	const pathData = path.join(__dirname, "../data");
	const documents = await new SimpleDirectoryReader().loadData({
		directoryPath: pathData,
	});
	let index = await VectorStoreIndex.fromDocuments(documents, {
		storageContext,
	}); */

	// Get an index without parsing the documents (storage already exists)
	let index = await VectorStoreIndex.init({
		storageContext,
	});

	/* // Create a query engine: convenience function combines several components: Retriever, Postprocessing, Synthesizer
	const queryEngine = index.asQueryEngine();

	// Ask a question
	const response = await queryEngine.query({
		query,
	}); */
	const retriever = index.asRetriever();
	retriever.similarityTopK = 3; // How many pieces of data to return from your vector store

	let chatEngine = new ContextChatEngine({
		retriever,
	});

	const response = await chatEngine.chat({
		message: query,
		// chatHistory: messageHistory,
		stream: true,
	});

	return response;
};

// POST
router.post("/", async (req, res, next) => {
	console.log("API FUNCTION CALLED!");
	const { query } = req.body;
	const stream = await askDocs(query);
	res.status(200);
	for await (const data of stream) {
		// here express will stream the response
		res.write(data.response || "");
	}
	// here express sends the closing/done/end signal for the stream consumer
	res.end();
});

export default router;
