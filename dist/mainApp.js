"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const StudentRouter_1 = __importDefault(require("./router/StudentRouter"));
const StudyRouter_1 = __importDefault(require("./router/StudyRouter"));
const mainApp = (app) => {
    try {
        app.use("/api", StudentRouter_1.default);
        app.use("/api", StudyRouter_1.default);
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "Study API",
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "Error loading",
                });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.mainApp = mainApp;
