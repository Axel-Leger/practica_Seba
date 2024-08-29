import express from "express";
import "./src/database/connection.js";
import { PORT } from "./src/Settings/environments.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { userRoutes } from "./src/Routes/user.routes.js";

const app = express();

//Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`server iniciadio en el puerto ${PORT}`);
});
