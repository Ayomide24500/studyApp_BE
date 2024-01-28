import { Router } from "express";
import {
  VerifyStudent,
  createStudent,
  loginStudent,
} from "../controller/userController";

const router: Router = Router();

router.route("/create-student").post(createStudent);
router.route("/verify-student/:studentID").patch(VerifyStudent);
router.route("/sign-in-student").post(loginStudent);

export default router;
