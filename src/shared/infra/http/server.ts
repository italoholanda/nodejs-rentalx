import "reflect-metadata";
import express, { Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import swaggerOptions from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import { router } from "./routes";

import "../../../database";
import "../../container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(router);

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError)
    return response.status(err.statusCode).json(err.message);
  return response.status(500).json(`Internal server error: ${err.message}`);
});

app.listen(3333, () => console.log("\nSERVER RUNNING ...\n"));
