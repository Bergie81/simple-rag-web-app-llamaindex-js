import winston from "winston";

export default (err, req, res, next) => {
	winston.error(err.message, err);

	res.status(500).send("Something went wrong :(");
};

/* 
winston levels:
error
warn
info
verbose
debug
silly
*/
