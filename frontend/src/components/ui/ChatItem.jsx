import ChatAvatar from "./ChatAvatar";

const ChatItem = (message) => {
	return (
		<div className="flex items-start gap-4 pt-5">
			<ChatAvatar {...message} />
			<p className="break-words">{message.content}</p>
		</div>
	);
};

export default ChatItem;
