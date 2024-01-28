"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StudyModel = new mongoose_1.Schema({
    totalTime: {
        type: String,
    },
    startingTime: {
        type: String,
    },
    endingTime: {
        type: String,
    },
    breakTime: {
        type: String,
    },
    Notes: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("StudyDetails", StudyModel);
