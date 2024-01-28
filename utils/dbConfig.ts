import { connect } from "mongoose";

const URL: string = "mongodb://localhost:27017/study";

export const dbConfig = async () => {
  try {
    await connect(URL).then(() => {
      console.log("database is been connected successfully..!!");
    });
  } catch (error) {
    return error;
  }
};
