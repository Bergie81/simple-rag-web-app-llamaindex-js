import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import "dotenv/config";

import { VectorStoreIndex, SimpleDirectoryReader } from "llamaindex";

const router = express.Router();

const askDocs = async (query) => {
	// Load data from  directory
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
	const pathData = path.join(__dirname, "../data");

	// Load our data from a local directory
	const documents = await new SimpleDirectoryReader().loadData({
		directoryPath: pathData,
	});

	// Initialize an index
	const index = await VectorStoreIndex.fromDocuments(documents);

	// Create a query engine: convenience function combines several components: Retriever, Postprocessing, Synthesizer
	const queryEngine = index.asQueryEngine();

	// Ask a question
	const response = await queryEngine.query({
		query,
	});
	// console.log(response.toString());

	return response.toString();
};

// POST
router.post("/", async (req, res, next) => {
	console.log("API FUNCTION CALLED!");
	const { query } = req.body;
	const response = await askDocs(query);
	res.status(200).json({
		message: "Answer fetched!",
		response,
	});
});

export default router;
