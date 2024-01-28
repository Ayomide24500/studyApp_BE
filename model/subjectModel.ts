import { Types } from "mongoose";
import { Document, Schema, model } from "mongoose";

interface iUser {
  subjectName: string;
  totalStudy_Goal: string;
  currentProgress: string;
}

interface iUserData extends iUser, Document {}

const UserModel = new Schema<iUserData>(
  {
    subjectName: {
      type: String,
      unique: true,
    },
    totalStudy_Goal: {
      type: String,
      unique: true,
    },
    currentProgress: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iUserData>("Subjects", UserModel);
