import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import "dotenv/config";
import {
	storageContextFromDefaults,
	SimpleDirectoryReader,
	VectorStoreIndex,
} from "llamaindex";

const router = express.Router();

let indexing = { isSuccess: false, message: "" };

const reIndex = async () => {
	// Get the directory of the app
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	// Create a storage context
	try {
		const pathStorage = path.join(__dirname, "../_storage");
		const storageContext = await storageContextFromDefaults({
			persistDir: pathStorage,
		});

		// Load the data and create an index
		const pathData = path.join(__dirname, "../data");
		const documents = await new SimpleDirectoryReader().loadData({
			directoryPath: pathData,
		});

		await VectorStoreIndex.fromDocuments(documents, {
			storageContext,
		});

		indexing.isSuccess = true;
		indexing.message = "Indexing complete";
	} catch (error) {
		console.error("Error during in-dexing", error);
		indexing.isSuccess = false;
		indexing.message = "Indexing failed!" + error;
	}
	return indexing;
};

// POST
router.post("/", async (req, res, next) => {
	console.log("Re-indexing...");
	const { isSuccess, message } = await reIndex();
	console.log("STATUS", message);
	res.status(200).json({ success: isSuccess, message });
});

export default router;
