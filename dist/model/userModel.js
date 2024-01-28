"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const UserModel = new mongoose_2.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    verify: {
        type: Boolean,
    },
    token: {
        type: String,
    },
    studyPoint: {
        type: String,
    },
    studyHistory: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "StudyDetails",
        },
    ],
    subject: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Subjects",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_2.model)("studentdetails", UserModel);
