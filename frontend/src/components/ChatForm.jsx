import { useState } from "react";

const ChatForm = () => {
	const [query, setQuery] = useState("");
	const [answer, setAnswer] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setAnswer("Thinking...");
		const response = await fetch("http://localhost:3333/rag", {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query }),
		});
		if (!response.ok || !response.body) {
			throw response.statusText;
		}

		// Here we start prepping for the streaming response
		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let isFirstChunk = true;

		while (true) {
			// Here we start reading the stream, until its done.
			const { value, done } = await reader.read();
			if (done) {
				break;
			}
			const decodedChunk = decoder.decode(value, { stream: true });
			if (isFirstChunk) {
				setAnswer(decodedChunk); // set the first chunk as the answer
				isFirstChunk = false; // subsequent chunks will be appended
			} else {
				setAnswer((answer) => answer + decodedChunk); // update state with new chunk
			}
			setQuery(""); // clear the input field
		}
	};

	// Function to update the state with the input value
	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	return (
		<div className="w-full px-12 min-h-48 h-[calc(100vh-180px)] flex flex-col gap-4">
			<div className="flex-grow shadow-md rounded-md p-6" id="answer">
				{answer}
			</div>
			<form className="w-full flex gap-3 mb-4" onSubmit={handleSubmit}>
				<input
					className="shadow-md rounded-md flex-grow flex-shrink px-4"
					id="query"
					type="text"
					value={query}
					onChange={handleChange}
					placeholder="Type a question here..."
				/>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transform transition duration-300 ease-in-out"
					type="submit"
				>
					Query
				</button>
			</form>
		</div>
	);
};

export default ChatForm;
