import Chat from "./components/Chat";

const App = () => {
	return (
		<main className="flex min-h-screen flex-col items-center gap-10 px-24 mt-12 background-gradient">
			<h1 className="text-3xl">JavaScript RAG Web App with LlamaIndex</h1>
			<Chat />
		</main>
	);
};

export default App;
