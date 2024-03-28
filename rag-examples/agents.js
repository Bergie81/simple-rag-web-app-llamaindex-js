import "dotenv/config";
import {
	Document,
	VectorStoreIndex,
	SimpleDirectoryReader,
	RouterQueryEngine,
	OpenAIAgent,
	QueryEngineTool,
	FunctionTool,
} from "llamaindex";

// Document 1
const documents1 = await new SimpleDirectoryReader().loadData({
	directoryPath: "../src/data",
});
const index1 = await VectorStoreIndex.fromDocuments(documents1);
const queryEngine1 = index1.asQueryEngine();

// Document 2
const documents2 = await new SimpleDirectoryReader().loadData({
	directoryPath: "../src/data2",
});
const index2 = await VectorStoreIndex.fromDocuments(documents2);
const queryEngine2 = index2.asQueryEngine();

// Create Router Query Engine and use query engines as tools, LLM decides which one to use
const queryEngine = await RouterQueryEngine.fromDefaults({
	queryEngineTools: [
		{
			queryEngine: queryEngine1,
			description:
				"Product instructions about the foodproof Salmonella Detection LyoKit",
		},
		{
			queryEngine: queryEngine2,
			description: "Product instructions about the Dualo32 R2",
		},
	],
});

// AGENTS
// Define a function that gets used by the agent
function sumNumbers({ a, b }) {
	return a + b;
}

// To use the function we have to tell the agents what are arguments are and put it in a defined JSON format
const sumJSON = {
	type: "object",
	properties: {
		a: {
			type: "number",
			description: "The first number",
		},
		b: {
			type: "number",
			description: "The second number",
		},
	},
	required: ["a", "b"],
};

// Turn function into a tool
const sumFunctionTool = new FunctionTool(sumNumbers, {
	name: "sumNumbers",
	description: "Use this function to sum two numbers",
	parameters: sumJSON,
});

// Make the router query engine into a tool
const queryEngineTool = new QueryEngineTool({
	queryEngine: queryEngine,
	metadata: {
		name: "product_instruction_engine",
		description:
			"A tool that can answer questions about the Salmonella LyoKit and Dualo32 R2",
	},
});

// Use the two tools
const agent = new OpenAIAgent({
	tools: [queryEngineTool, sumFunctionTool],
	verbose: true,
});

// Ask the agent a question
let response = await agent.chat({
	message: "What is 501 + 5?",
	// message: "What is the product number for the Dualo32 R2? Use the tool.", // Use the tool becomes important when there is already data from the training data of the LLM. So, it might not use the tool if it doesn't think it's necessary.
});
console.log(response.toString());
