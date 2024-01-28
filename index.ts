import express, { Application } from "express";
import cors from "cors";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
const port: number = parseInt(process.env.PORT!);

const app: Application = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

mainApp(app);
const server = app.listen(2300, () => {
  console.log("server is up and running");
  dbConfig();
});

process.on("uncaughtException", (err: Error) => {
  console.log("uncaughtException", err);

  process.exit();
});
process.on("unhandleRejection", (Reason: any) => {
  console.log("unhandleRejection", Reason);

  server.close(() => {
    process.exit(1);
  });
});
