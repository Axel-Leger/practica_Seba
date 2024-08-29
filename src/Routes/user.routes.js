import { Router } from "express";
import {
  getStudentsCtrl,
  createStudentCtrl,
  findStudentByIdCtrl,
  updateStudentCtrl,
  deleteStudentCtrl,
} from "../Controllers/user.controllers.js";

const userRoutes = Router();

userRoutes.get("/traerAlumnos", getStudentsCtrl);
userRoutes.post("/crearAlumno", createStudentCtrl);

userRoutes.get("/trearUnAlumno/:id", findStudentByIdCtrl);
userRoutes.patch("/ActualizarAlumno/:id", updateStudentCtrl);
userRoutes.delete("/EliminarAlumno/:id", deleteStudentCtrl);

export { userRoutes };
