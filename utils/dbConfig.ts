import { connect } from "mongoose";

const URL: string = process.env.DATABASE_URL!;

export const dbConfig = async () => {
  try {
    await connect(URL).then(() => {
      console.log("database is been connected successfully..!!");
    });
  } catch (error) {
    return error;
  }
};
