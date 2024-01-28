import { Request, Response } from "express";
import { CronJob } from "cron";
import lodash from "lodash";
import UserModel from "../model/userModel";
import moment from "moment";
import StudyModel from "../model/StudyModel";
import { Types } from "mongoose";

export const createStudy = async (req: Request, res: Response) => {
  try {
    const { breakDuration, breakTime, studyDuration } = req.body;
    const { studentID } = req.params;

    const Student = await UserModel.findById(studentID);

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
    const cronfor = moment(getMinutes).format("h:mm:ss a");

    const study = await StudyModel.create({
      studyTime: `${studyTime} minutes`,
      breakDuration: ` ${breakDuration} minutes`,
      studyDuration: `${studyDuration} hours`,
    });

    const cron: any = new CronJob(
      `${cronfor.split(":")[1]} ${cronfor.split(":")[0]} * * *`,
      async function () {
        console.log("Start Break");
        await StudyModel.findByIdAndUpdate(
          study._id,
          { endStudy: true, studyPoint: +studyDuration },
          { new: true }
        );

        Student!.studyPoint! = Student?.studyPoint + +studyDuration;
        Student?.save();

        console.log("true");

        cron.stop();
      },
      null,
      true,
      "America/Los_Angeles"
    );

    console.log("study._id:", study._id);
    Student?.studyHistory!.push(study._id);
    Student?.save();

    cron.start();

    return res.status(201).json({
      msg: "Study created",
      data: study,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating study",
      status: 404,
    });
  }
};

export const AddSubjectLearnt = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;

    const user = await StudyModel.findById(studentID);

    if (user) {
      const updatedUser = await StudyModel.findByIdAndUpdate(
        studentID,
        {
          verify: true,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "verifying student",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const addStudentPoint = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await UserModel.findById(userID).populate({
      path: "studyHistory",
    });

    const points = user?.studyHistory
      ?.map((el: any, b: any) => {
        return el?.studyPoint;
      })
      .reduce((a: any, b: any) => a + b);

    if (user) {
      const update = await UserModel.findByIdAndUpdate(
        userID,
        { studentPoints: points },
        { new: true }
      );
      return res.status(201).json({
        message: "Point added",
        data: update,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating study",
      status: 404,
    });
  }
};

export const getTopFive = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();

    const groupedByPoints = lodash.groupBy(users, "studyPoints");

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
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating study",
      status: 404,
    });
  }
};

export const getStudy = async () => {
  try {
  } catch (error) {}
};
