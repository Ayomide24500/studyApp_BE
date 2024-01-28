import { Request, Response } from "express";
import { CronJob } from "cron";
import lodash from "lodash";
import UserModel from "../model/userModel";
import moment from "moment";
import StudyModel from "../model/StudyModel";
import { Types } from "mongoose";

export const createStudy = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const { studyDuration, breakDuration, breakTime } = req.body;

    const hourConvertOfDuration = +studyDuration * 60;

    const numberOfBreaks = hourConvertOfDuration / +breakTime;

    const totalStudyTime =
      hourConvertOfDuration + numberOfBreaks * breakDuration;

    const user = await UserModel.findById(studentID);

    if (!user) {
      return res.status(404).json({
        message: "student not found",
      });
    }
    const getMinutes = new Date().setMinutes(totalStudyTime);

    const forCron = moment(getMinutes).format("h:mm:ss a");

    const study = await StudyModel.create({
      totalTime: `${totalStudyTime} minutes`,
      breakDuration: `${breakDuration} minutes`,
      studyDuration: `${studyDuration} hours`,
    });

    const cron = new CronJob(
      `${forCron.split(":")[1]} ${forCron.split(":")[0]} * * * `,
      async function () {
        await StudyModel.findByIdAndUpdate(
          study?._id,
          { endTime: true, studyPoint: +studyDuration },
          { new: true }
        );

        user!.studyPoint! = user?.studyPoint! + +studyDuration;
        user?.save();

        console.log("true");

        cron.stop();
      },
      null,
      true,
      "America/Los_Angeles"
    );

    user?.studyHistory.push(new Types.ObjectId(study._id));
    user?.save();

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
    const { studentID } = req.params;

    const user = await UserModel.findById(studentID).populate({
      path: "studyHistory",
    });

    const points = user?.studyHistory
      ?.map((el: any, b: any) => {
        return el?.studyPoint;
      })
      .reduce((a: any, b: any) => a + b);

    if (user) {
      const update = await UserModel.findByIdAndUpdate(
        studentID,
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
      msg: "Error adding points",
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

export const viewStudyById = async (req: Request, res: Response) => {
  try {
    const { studyID } = req.params;

    const study = await StudyModel.findById(studyID);

    return res.status(200).json({
      msg: "study gotten",
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

export const updateEndTime = async (req: Request, res: Response) => {
  try {
    const { studyID } = req.params;

    const studyDuration = await StudyModel.findById(studyID);

    const study = await StudyModel.findByIdAndUpdate(
      studyID,
      { endStudy: true, studyPoint: +studyDuration?.studyDuration! },
      { new: true }
    );

    return res.status(200).json({
      msg: "Time elapsed",
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
