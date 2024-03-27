// Basic RAG with convenient functions
import { Document, VectorStoreIndex, SimpleDirectoryReader } from "llamaindex";
import "dotenv/config";

// Load our data from a local directory
const documents = await new SimpleDirectoryReader().loadData({
	directoryPath: "./data",
});

// Initialize an index
const index = await VectorStoreIndex.fromDocuments(documents);

// Create a query engine: convenience function combines several components: Retriever, Postprocessing, Synthesizer
const queryEngine = index.asQueryEngine();

// Ask a question
const response = await queryEngine.query({
	query: "How many cycles are run for the amplification in the program setup?",
});
console.log(response.toString());
