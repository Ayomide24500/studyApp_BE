"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudentName = exports.loginStudent = exports.VerifyStudent = exports.createStudent = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, userName } = req.body;
        const salt = yield bcrypt_1.default.genSalt(5);
        const hashedpassword = yield bcrypt_1.default.hash(password, salt);
        const token = crypto_1.default.randomBytes(3).toString("hex");
        const user = yield userModel_1.default.create({
            email,
            userName,
            password: hashedpassword,
            token,
        });
        return res.status(200).json({
            message: "Student created successfully",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            message: "Error creating student",
        });
    }
});
exports.createStudent = createStudent;
const VerifyStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const user = yield userModel_1.default.findById(studentID);
        if (user) {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(studentID, {
                token: "",
                verify: true,
            }, { new: true });
            return res.status(200).json({
                message: "verifying student",
                data: updatedUser,
            });
        }
        else {
            return res.status(404).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.VerifyStudent = VerifyStudent;
const loginStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const student = yield userModel_1.default.findOne({ email });
        const decrypt = yield bcrypt_1.default.compare(password, student === null || student === void 0 ? void 0 : student.password);
        if ((student === null || student === void 0 ? void 0 : student.email) === email) {
            if (decrypt) {
                const encrypted = jsonwebtoken_1.default.sign({ id: student === null || student === void 0 ? void 0 : student._id }, "Stud", {
                    expiresIn: "2d",
                });
                return res.status(201).json({
                    msg: "User verified and can login now",
                    status: 201,
                    data: encrypted,
                });
            }
            else {
                return res.status(404).json({
                    msg: "Password incorrect",
                    status: 404,
                });
            }
        }
        else {
            return res.status(404).json({
                msg: "Email incorrect",
                status: 404,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating user",
            status: 404,
        });
    }
});
exports.loginStudent = loginStudent;
const UpdateStudentName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const user = yield userModel_1.default.findById(studentID);
        if (user) {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(studentID, {
                userName: true,
            }, { new: true });
            return res.status(200).json({
                message: "Student name updated",
                data: updatedUser,
            });
        }
        else {
            return res.status(404).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error updating student name",
        });
    }
});
exports.UpdateStudentName = UpdateStudentName;
