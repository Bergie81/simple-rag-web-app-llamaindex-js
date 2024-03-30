export const isValidMessageData = (rawData) => {
	if (!rawData || typeof rawData !== "object") return false;
	if (Object.keys(rawData).length === 0) return false;
	return true;
};

export const insertDataIntoMessages = (messages, data) => {
	if (!data) return messages;
	messages.forEach((message, i) => {
		const rawData = data[i];
		if (isValidMessageData(rawData)) message.data = rawData;
	});
	return messages;
};
