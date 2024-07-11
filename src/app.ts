import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import { StudentRoutes } from "./app/modules/students/student.route";
import { userRoutes } from "./app/modules/users/user.route";

// express
const app = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', userRoutes)

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
