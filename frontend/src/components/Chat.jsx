import { useChat } from "ai/react";
import { useMemo } from "react";
import { insertDataIntoMessages } from "./transform.js";
import ChatInput from "./ui/ChatInput.jsx";
import ChatMessages from "./ui/ChatMessages.jsx";

const Chat = () => {
	const {
		messages,
		input,
		isLoading,
		handleSubmit,
		handleInputChange,
		reload,
		stop,
		data,
	} = useChat({
		api: import.meta.env.NEXT_PUBLIC_CHAT_API,
		headers: {
			"Content-Type": "application/json",
		},
	});

	const transformedMessages = useMemo(() => {
		return insertDataIntoMessages(messages, data);
	}, [messages, data]);

	return (
		<div className="space-y-4 max-w-5xl w-full">
			<ChatMessages
				messages={transformedMessages}
				isLoading={isLoading}
				reload={reload}
				stop={stop}
			/>
			<ChatInput
				input={input}
				handleSubmit={handleSubmit}
				handleInputChange={handleInputChange}
				isLoading={isLoading}
				multiModal={
					import.meta.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"
				}
			/>
		</div>
	);
};

export default Chat;