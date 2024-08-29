import { json } from "express";
import { myPool } from "../database/connection.js";

//GET /traerAlumnos
export const getStudentsCtrl = async (_req, res) => {
  try {
    const [alumonos] = await myPool.query("SELECT * FROM clasedealumnos");

    res.status(200).json(alumonos);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "error en la base de datos",
    });
  }
};

//POST /crearAlumno
export const createStudentCtrl = async (req, res) => {
  const { nombre_Alumno, Direccion } = req.body;

  try {
    const [resultado] = await myPool.execute(
      "INSERT INTO clasedealumnos( nombre_Alumno, Direccion) VALUES (?,?)",
      [nombre_Alumno, Direccion]
    );

    const [usarioEncontrado] = await myPool.execute(
      "SELECT * FROM clasedealumnos WHERE id= ?",
      [resultado.insertId]
    );

    res.status(201).json(usarioEncontrado[0]);
  } catch (error) {
    console.log(error);

    res.status(500),
      json({
        msg: "HUBO UN ERROR EN LA BASE DE DATOS",
      });
  }
};

//GET /trearAlumnoPorID
export const findStudentByIdCtrl = async (req, res) => {
  const studentId = +req.params.id;

  try {
    const [resultado] = await myPool.execute(
      "SELECT * FROM clasedealumnos WHERE id= ?",
      [studentId]
    );

    if (resultado.length < 1) {
      return res.status(400).json({ msg: "No hay ningin usario" });
    }

    res.status(201).json(resultado[0]);
  } catch (error) {
    console.log(error);

    res.status(500),
      json({
        msg: "HUBO UN ERROR EN LA BASE DE DATOS",
      });
  }
};

//PATCH /ModificarAlumno
export const updateStudentCtrl = async (req, res) => {
  const studentId = +req.params.id;
  const { nombre_Alumno, Direccion } = req.body;

  try {
    const [resultado] = await myPool.execute(
      "UPDATE clasedealumnos SET nombre_Alumno = ? , Direccion = ? WHERE id = ?",
      [nombre_Alumno, Direccion, studentId]
    );

    if ((resultado.affectedRows = 0)) {
      return res.status(404).json({
        msg: "NO SE ENCONTRO EL USARIO",
      });
    }

    const [encontrarAlumno] = await myPool.execute(
      "SELECT * FROM clasedealumnos WHERE id= ?",
      [studentId]
    );

    res.status(202).json(encontrarAlumno[0]);
  } catch (error) {
    console.log(error);

    res.status(500),
      json({
        msg: "HUBO UN ERROR EN LA BASE DE DATOS",
      });
  }
};

//DELETE /EliminarAlumno
export const deleteStudentCtrl = async (req, res) => {
  const studentId = +req.params.id;

  try {
    const [resultado] = await myPool.execute(
      "DELETE FROM clasedealumnos WHERE id = ?",
      [studentId]
    );

    if (resultado.affectedRows == 0) {
      return res.status(404).json({
        msg: "USARIO NO ENCONTRADO",
      });
    }

    res.status(201).json({
      msg: "SE ELIMINO CON EXITO EL ALUMNO",
    });
  } catch (error) {
    console.log(error);

    res.status(500),
      json({
        msg: "HUBO UN ERROR EN LA BASE DE DATOS",
      });
  }
};
