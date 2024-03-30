import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import "dotenv/config";
import { storageContextFromDefaults, VectorStoreIndex } from "llamaindex";

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

	// INFO: Run this code once to index the data and store it in the storage
	/* // Load the data and create an index
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
