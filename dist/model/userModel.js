"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const UserModel = new mongoose_2.Schema({
    userName: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
    study: [
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
exports.default = (0, mongoose_2.model)("StudentDetails", UserModel);
