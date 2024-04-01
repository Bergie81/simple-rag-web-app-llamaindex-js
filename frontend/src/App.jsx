import Chat from "./components/ChatForm.jsx";
import ReIndexButton from "./components/ReindexButton.jsx";

const App = () => {
	return (
		<main className="flex h-full max-w-screen-sm lg:max-w-screen-lg mx-auto flex-col items-center gap-10 mt-12 background-gradient px-12">
			<h1 className="text-2xl">RAG Chat App with LlamaIndex.js</h1>
			<ReIndexButton />
			<Chat />
		</main>
	);
};

export default App;
