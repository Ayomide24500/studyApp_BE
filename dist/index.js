"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mainApp_1 = require("./mainApp");
const dbConfig_1 = require("./utils/dbConfig");
const port = parseInt(process.env.PORT);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, mainApp_1.mainApp)(app);
const server = app.listen(2300, () => {
    console.log("server is up and running");
    (0, dbConfig_1.dbConfig)();
});
process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit();
});
process.on("unhandleRejection", (Reason) => {
    console.log("unhandleRejection", Reason);
    server.close(() => {
        process.exit(1);
    });
});
