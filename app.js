import "dotenv/config";
// console.log(process.env.OPENAI_API_KEY);
import { Document, VectorStoreIndex, SimpleDirectoryReader } from "llamaindex";

const documents = await new SimpleDirectoryReader().loadData({
	directoryPath: "./data",
});

const index = await VectorStoreIndex.fromDocuments(documents);

const queryEngine = index.asQueryEngine();

const response = await queryEngine.query({
	query: "What is the product number of the Salmonella LyoKit?",
});

console.log(response.toString());
