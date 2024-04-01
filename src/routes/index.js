import bodyParser from "body-parser";

// import authRoutes from "./auth";
import chatRoutes from "./chat.js";
import reindexRoutes from "./reindex.js";
import error from "../middleware/error.js";

export default function (app) {
	// Configure CORPS
	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Access-Control-Allow-Methods",
			"OPTIONS, GET, POST, PUT, PATCH, DELETE"
		);
		// Content-Type: Client with headers: { "Content-Type": "application/json" } available
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization"
		);
		next();
	});

	// For x-www-form-urlencoded <form>:
	// app.use(bodyParser.urlencoded({ extended: false }))

	// application/json, to parse incoming json data in body:
	app.use(bodyParser.json());
	// app.use("/auth", authRoutes);
	app.use("/chat", chatRoutes);
	app.use("/reindex", reindexRoutes);
	app.use(error); // General Error Handling Middleware
}
