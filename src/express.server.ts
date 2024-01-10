import cors from "cors";
import express, { Request, Response } from "express";

import docRouter from "./docs/docs.routes";
import assessmentRouter from "./routes/assessment.routes";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  // ROTAS --
  app.use(userRouter);
  app.use(authRouter);
  app.use(assessmentRouter);
  app.use(docRouter);

  app.get("/", (req: Request, res: Response) => {
    return res
      .status(200)
      .send({ success: true, message: "API - Alunos Prisma" });
  });

  return app;
};
