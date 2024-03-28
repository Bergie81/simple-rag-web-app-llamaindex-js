import express from "express";
import "dotenv/config";

import log from "./startup/log.js";
import routes from "./routes/index.js";
import prod from "./startup/prod.js";

const app = express();

// ROUTES
log();
routes(app);
prod(app);

// START SERVER
const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
