// Detailed RAG
import * as llamaIndex from "llamaindex";
import "dotenv/config";

// Load our data from a local directory
const documents = await new llamaIndex.SimpleDirectoryReader().loadData({
	directoryPath: "../data",
});

// Initialize an index
const index = await llamaIndex.VectorStoreIndex.fromDocuments(documents);

// LLM to answer questions, embedding model to encode them
let customLLM = new llamaIndex.OpenAI();
let customEmbedding = new llamaIndex.OpenAIEmbedding();

// Let's put the LLM and the embedding model into a ServiceContext object
let customServiceContext = new llamaIndex.serviceContextFromDefaults({
	llm: customLLM,
	embedModel: customEmbedding,
});

// Custom prompt, customized to do more
let customQaPrompt = function ({ context = "", query = "" }) {
	return `Context information is below.
      ---------------------
      ${context}
      ---------------------
      Given the context information, answer the query.
      Include a random fact about dolphins in your answer.\
      The dolphin fact can come from your training data.
      Query: ${query}
      Answer:`;
};

// You need a ResponseBuilder that uses our prompt and our service context.
let customResponseBuilder = new llamaIndex.SimpleResponseBuilder(
	customServiceContext,
	customQaPrompt
);

// The responseBuilder goes to a synthesizer, which also needs a service context.
let customSynthesizer = new llamaIndex.ResponseSynthesizer({
	responseBuilder: customResponseBuilder,
	serviceContext: customServiceContext,
});

// You also need a `retriever`.
let customRetriever = new llamaIndex.VectorIndexRetriever({
	index,
});

// The synthesizer and the retriever go to our query engine:
let customQueryEngine = new llamaIndex.RetrieverQueryEngine(
	customRetriever,
	customSynthesizer
);

// Ask a question
const response = await customQueryEngine.query({
	query: "What is the product number of the Salmonella LyoKit?",
});
console.log(response.toString());
