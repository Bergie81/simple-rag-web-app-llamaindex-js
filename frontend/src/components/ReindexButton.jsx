const ReindexButton = () => {
	const handleClick = async (e) => {
		const response = await fetch("http://localhost:3333/reindex", {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		// console.log("Response:", response.ok);
		console.log("Re-indexing successful:", data.success);
		console.log("Re-indexing Message:", data.message);
	};
	return (
		<div className="flex w-full justify-end">
			<button
				className="bg-white border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 rounded shadow-md transform transition duration-300 ease-in-out "
				onClick={handleClick}
			>
				Re-Index Data
			</button>
		</div>
	);
};

export default ReindexButton;
