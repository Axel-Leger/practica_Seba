import { Router } from "express";
import {
  getStudentsCtrl,
  createStudentCtrl,
  findStudentByIdCtrl,
  updateStudentCtrl,
  deleteStudentCtrl,
} from "../Controllers/user.controllers.js";
import {
  createUserValidation,
  updateUserValidation,
} from "../validation/user.validations.js";
import { applyValidations } from "../Middlewares/validations.middlewares.js";

const userRoutes = Router();

//trear todos los alumnos
userRoutes.get("/traerAlumnos", getStudentsCtrl);

//agregar alumno
userRoutes.post(
  "/crearAlumno",
  createUserValidation,
  applyValidations,
  createStudentCtrl
);

//traer alumno por id
userRoutes.get("/trearUnAlumno/:id", findStudentByIdCtrl);

//actualaizar alumno
userRoutes.put(
  "/ActualizarAlumno/:id",
  updateUserValidation,
  applyValidations,
  updateStudentCtrl
);

//eliminar alumno
userRoutes.delete("/EliminarAlumno/:id", deleteStudentCtrl);

export { userRoutes };
