import Chat from "./components/ChatForm.jsx";

const App = () => {
	return (
		<main className="flex h-full max-w-screen-sm lg:max-w-screen-lg mx-auto flex-col items-center gap-10 mt-12 background-gradient">
			<h1 className="text-2xl px-12">JavaScript RAG Web App with LlamaIndex</h1>
			<Chat />
		</main>
	);
};

export default App;
