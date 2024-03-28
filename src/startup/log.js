import winston from "winston";
// Adds try/catch block to controllers and puts code in async handler
// exceptions are passed in catch block to general error handler
import "express-async-errors";

export default function () {
	process.on("uncaughtException", (ex) => {
		console.log("WE GOT AN UNCAUGHT EXCEPTION");
		winston.error(ex.message, ex);
	});

	process.on("unhandledRejection", (ex) => {
		console.log("WE GOT AN UNHANDLED REJECTION");
		winston.error(ex.message, ex);
	});

	winston.add(
		new winston.transports.Console({ colorize: true, prettyPrint: true })
	);
	winston.add(
		new winston.transports.File({
			filename: "logs.log",
		})
	);
}
