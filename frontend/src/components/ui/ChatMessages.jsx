import { useEffect, useRef } from "react";
import ChatItem from "./ChatItem";

const ChatMessages = ({ messages, isLoading, reload, stop }) => {
	const scrollableChatContainerRef = useRef(null);

	const scrollToBottom = () => {
		if (scrollableChatContainerRef.current) {
			scrollableChatContainerRef.current.scrollTop =
				scrollableChatContainerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages.length]);

	return (
		<div className="w-full max-w-5xl p-4 bg-white rounded-xl shadow-xl">
			<div
				className="flex flex-col gap-5 divide-y h-[50vh] overflow-auto"
				ref={scrollableChatContainerRef}
			>
				{messages.map((m) => (
					<ChatItem key={m.id} {...m} />
				))}
			</div>
		</div>
	);
};

export default ChatMessages;
