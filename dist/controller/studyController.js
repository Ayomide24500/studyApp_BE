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
exports.getStudy = exports.getTopFive = exports.addStudentPoint = exports.AddSubjectLearnt = exports.createStudy = void 0;
const cron_1 = require("cron");
const lodash_1 = __importDefault(require("lodash"));
const userModel_1 = __importDefault(require("../model/userModel"));
const moment_1 = __importDefault(require("moment"));
const StudyModel_1 = __importDefault(require("../model/StudyModel"));
const createStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { breakDuration, breakTime, studyDuration } = req.body;
        const { studentID } = req.params;
        const Student = yield userModel_1.default.findById(studentID);
        if (!Student) {
            return res.status(404).json({
                msg: "User not found",
                status: 404,
            });
        }
        const hourDuration = +studyDuration * 60;
        const breakNumber = hourDuration / (breakDuration + breakTime);
        const studyTime = hourDuration + breakNumber * breakDuration;
        const getMinutes = new Date().setMinutes(studyTime);
        const cronfor = (0, moment_1.default)(getMinutes).format("h:mm:ss a");
        const study = yield StudyModel_1.default.create({
            studyTime: `${studyTime} minutes`,
            breakDuration: ` ${breakDuration} minutes`,
            studyDuration: `${studyDuration} hours`,
        });
        const cron = new cron_1.CronJob(`${cronfor.split(":")[1]} ${cronfor.split(":")[0]} * * *`, function () {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("Start Break");
                yield StudyModel_1.default.findByIdAndUpdate(study._id, { endStudy: true, studyPoint: +studyDuration }, { new: true });
                Student.studyPoint = (Student === null || Student === void 0 ? void 0 : Student.studyPoint) + +studyDuration;
                Student === null || Student === void 0 ? void 0 : Student.save();
                console.log("true");
                cron.stop();
            });
        }, null, true, "America/Los_Angeles");
        console.log("study._id:", study._id);
        Student === null || Student === void 0 ? void 0 : Student.studyHistory.push(study._id);
        Student === null || Student === void 0 ? void 0 : Student.save();
        cron.start();
        return res.status(201).json({
            msg: "Study created",
            data: study,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "Error creating study",
            status: 404,
        });
    }
});
exports.createStudy = createStudy;
const AddSubjectLearnt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const user = yield StudyModel_1.default.findById(studentID);
        if (user) {
            const updatedUser = yield StudyModel_1.default.findByIdAndUpdate(studentID, {
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
exports.AddSubjectLearnt = AddSubjectLearnt;
const addStudentPoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID).populate({
            path: "studyHistory",
        });
        const points = (_a = user === null || user === void 0 ? void 0 : user.studyHistory) === null || _a === void 0 ? void 0 : _a.map((el, b) => {
            return el === null || el === void 0 ? void 0 : el.studyPoint;
        }).reduce((a, b) => a + b);
        if (user) {
            const update = yield userModel_1.default.findByIdAndUpdate(userID, { studentPoints: points }, { new: true });
            return res.status(201).json({
                message: "Point added",
                data: update,
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "Error creating study",
            status: 404,
        });
    }
});
exports.addStudentPoint = addStudentPoint;
const getTopFive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        const groupedByPoints = lodash_1.default.groupBy(users, "studyPoints");
        const topFive = Object.entries(groupedByPoints)
            .sort((a, b) => +b[0] - +a[0])
            .slice(0, 5)
            .map(([studyPoints, users]) => ({
            studyPoints: +studyPoints,
            users,
        }));
        return res.status(200).json({
            msg: "Top five gotten",
            data: topFive,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "Error creating study",
            status: 404,
        });
    }
});
exports.getTopFive = getTopFive;
const getStudy = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.getStudy = getStudy;
