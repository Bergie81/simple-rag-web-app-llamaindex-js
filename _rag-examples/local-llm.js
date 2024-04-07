import {
	VectorStoreIndex,
	Ollama,
	storageContextFromDefaults,
	serviceContextFromDefaults,
} from "llamaindex";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import "dotenv/config";

const ollama = new Ollama({ model: "mistral", temperature: 0.5 });

(async () => {
	// Get the directory of the app
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	// Create a storage context
	const pathStorage = path.join(__dirname, "./storage");
	const storageContext = await storageContextFromDefaults({
		persistDir: pathStorage,
	});

	const serviceContext = serviceContextFromDefaults({
		llm: ollama,
	});

	// Get an index without parsing the documents (storage already exists)
	let index = await VectorStoreIndex.init({
		storageContext,
		serviceContext,
	});

	// get retriever
	const retriever = index.asRetriever();

	// Create a query engine
	const queryEngine = index.asQueryEngine({
		retriever,
	});

	const query =
		"What is the product number of the Salmonella Detection LyoKit?"; // "Who created you?";

	// Query
	const response = await queryEngine.query({
		query,
	});

	// Log the response
	console.log(response.response);
})();
