import express from "express";

const router = express.Router();

// GET
router.get("/", async (req, res, next) => {
	console.log("GET /rag/");
	res.status(200).json({
		message: "Hello from RAG!",
	});
});

export default router;
