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

//PUT /ModificarAlumno
export const updateStudentCtrl = async (req, res) => {
  console.log("estás editando");
  const { id } = req.params;
  console.log("el estudiante numero ", id);
  const { nombre_Alumno, Direccion } = req.body;
  try {
    //buscar si la tarea esta en la base de datos
    const [AlumnoEncontrado] = await myPool.query(
      "SELECT * FROM clasedealumnos WHERE id=?",
      [id]
    );

    if (AlumnoEncontrado.length === 0) {
      console.log("Alumno no encontrada");
    } else {
      const [resultado] = await myPool.query(
        "UPDATE clasedealumnos SET nombre_Alumno=?,Direccion=? WHERE id=?",
        [nombre_Alumno, Direccion, id]
      );
      if (!resultado.ok) {
        return res
          .status(200)
          .json({ msg: "el alumno fue editada correctamente" });
      } else {
        return res
          .status(404)
          .json({ msg: "ocurrio un error al editar al alumno " });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "error interno del servidor", error });
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

    res.status(200).json({
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
