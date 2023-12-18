import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import assessmentRouter from "./routes/assessment.routes";
import docRouter from "./docs/docs.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(authRouter);
app.use(assessmentRouter);
app.use(docRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .send({ success: true, message: "API - Alunos Prisma" });
});
