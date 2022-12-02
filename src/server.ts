import express, { Response, Request, Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import "colors";
// import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';

import { swaggerDocs } from "./config/swagger";

import errorHandeler from "./middleware/error";
import connectDB from "./config/db";

dotenv.config({ path: __dirname + "/config/config.env" });

connectDB();

const app: Application = express();

// Set security HTTP headers
app.use(helmet());
// TODO: Implement proper whitelists of IPs
app.use(cors());
// Data sanitization against XSS
// app.use(xss());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Body parsar
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers

//tag routes

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/v1/auth', authRoutes)
app.use('/v1/news', newsRoutes)
app.use('/v1/weather', weatherRoutes)

app.use(errorHandeler);

app.get("*", (req: Request, res: Response) => {
  res.status(200).send("This website is for API");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

interface IError {
  message: string;
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: IError, promise) => {
  console.log(`Error: ${err?.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
