"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studyController_1 = require("../controller/studyController");
const router = (0, express_1.Router)();
router.route("/create-study/:studentID").post(studyController_1.createStudy);
router.route("/get-top-schorlas").get(studyController_1.getTopFive);
exports.default = router;
