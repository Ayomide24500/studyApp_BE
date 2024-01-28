import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import UserModel from "../model/userModel";
import jwt from "jsonwebtoken";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;
    const salt = await bcrypt.genSalt(5);

    const hashedpassword = await bcrypt.hash(password, salt);

    const token = crypto.randomBytes(3).toString("hex");

    const user = await UserModel.create({
      email,
      userName,
      password: hashedpassword,
      token,
    });

    return res.status(200).json({
      message: "Student created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      message: "Error creating student",
    });
  }
};
export const VerifyStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;

    const user = await UserModel.findById(studentID);

    if (user) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        studentID,
        {
          token: "",
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

export const loginStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const student: any = await UserModel.findOne({ email });

    const decrypt = await bcrypt.compare(password, student?.password);

    if (student?.email === email) {
      if (decrypt) {
        const encrypted = jwt.sign({ id: student?._id }, "Stud", {
          expiresIn: "2d",
        });

        return res.status(201).json({
          msg: "User verified and can login now",
          status: 201,
          data: encrypted,
        });
      } else {
        return res.status(404).json({
          msg: "Password incorrect",
          status: 404,
        });
      }
    } else {
      return res.status(404).json({
        msg: "Email incorrect",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      msg: "Error creating user",
      status: 404,
    });
  }
};

export const UpdateStudentName = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;

    const user = await UserModel.findById(studentID);

    if (user) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        studentID,
        {
          userName: true,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Student name updated",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error updating student name",
    });
  }
};
