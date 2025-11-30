import express from "express";
import routes from "./api/routes";
import logger from "./api/middlewares/logger";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api", routes);

export default app;
