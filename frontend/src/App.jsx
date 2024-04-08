import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Chat from "./components/ChatForm.jsx";
import ReIndexButton from "./components/ReindexButton.jsx";

const App = () => {
	const [id, setId] = useState("");

	useEffect(() => {
		const uniqueId = uuidv4();
		setId(uniqueId);
	}, []);
	return (
		<main className="flex h-full max-w-screen-sm lg:max-w-screen-lg mx-auto flex-col items-center gap-10 mt-12 background-gradient px-12">
			<h1 className="text-2xl">RAG Chat App with LlamaIndex.js</h1>
			<ReIndexButton />
			<Chat id={id} />
		</main>
	);
};

export default App;
