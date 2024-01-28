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
    endStudy: {
        type: Boolean,
        default: false,
    },
    breakTime: {
        type: String,
    },
    studyPoint: {
        type: String,
    },
    breakDuration: {
        type: String,
    },
    studyDuration: {
        type: String,
    },
    studyHistory: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "studyHistory",
        },
    ],
    student: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "student",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("StudyDetails", StudyModel);
