import { Document, Schema, Types, model } from "mongoose";

interface iStudy {
  totalTime: string;
  startingTime: string;
  endStudy: boolean;
  breakTime: string;
  studyDuration: string;
  studyPoint: string;
  studyHistory: Types.ObjectId[];
  student: Array<{}>;
  breakDuration: string;
}

interface iStudyData extends iStudy, Document {}

const StudyModel = new Schema<iStudyData>(
  {
    totalTime: {
      type: String,
    },
    startingTime: {
      type: String,
    },
    endStudy: {
      type: Boolean,
      default: false,
    },
    breakTime: {
      type: String,
    },
    studyPoint: {
      type: String,
    },
    breakDuration: {
      type: String,
    },
    studyDuration: {
      type: String,
    },
    studyHistory: [
      {
        type: Types.ObjectId,
        ref: "studyHistory",
      },
    ],
    student: [
      {
        type: Types.ObjectId,
        ref: "student",
      },
    ],
  },
  { timestamps: true }
);

export default model<iStudyData>("StudyDetails", StudyModel);
