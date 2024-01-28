import { Types } from "mongoose";
import { Document, Schema, model } from "mongoose";

interface iUser {
  userName: string;
  email: string;
  password: string;
  token: string;
  verify: boolean;
  studyPoint: string;
  studyHistory: Types.ObjectId[];
  subject: Array<{}> | any;
}

interface iUserData extends iUser, Document {}

const UserModel = new Schema<iUserData>(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    verify: {
      type: Boolean,
    },
    token: {
      type: String,
    },
    studyPoint: {
      type: String,
    },
    studyHistory: [
      {
        type: Types.ObjectId,
        ref: "StudyDetails",
      },
    ],
    subject: [
      {
        type: Types.ObjectId,
        ref: "Subjects",
      },
    ],
  },
  { timestamps: true }
);

export default model<iUserData>("studentdetails", UserModel);
