import { Router } from "express";
import {
  createStudy,
  getTopFive,
  updateEndTime,
  viewStudyById,
} from "../controller/studyController";

const router: Router = Router();

router.route("/create-study/:studentID").post(createStudy);
router.route("/get-top-schorlas").get(getTopFive);
router.route("/get-study-details/:studyID").get(viewStudyById);
router.route("/update-end-time/:studyID").get(updateEndTime);

export default router;
