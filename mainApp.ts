import { Application, Request, Response } from "express";
import student from "./router/StudentRouter";
import study from "./router/StudyRouter";
export const mainApp = (app: Application) => {
  try {
    app.use("/api", student);
    app.use("/api", study);
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Study API",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error loading",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
