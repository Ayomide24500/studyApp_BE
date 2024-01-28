import { Router } from "express";
import { createStudy, getTopFive } from "../controller/studyController";

const router: Router = Router();

router.route("/create-study/:studentID").post(createStudy);
router.route("/get-top-schorlas").get(getTopFive);

export default router;
