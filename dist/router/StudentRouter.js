"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.route("/create-student").post(userController_1.createStudent);
router.route("/verify-student/:studentID").patch(userController_1.VerifyStudent);
router.route("/sign-in-student").post(userController_1.loginStudent);
exports.default = router;
