import { createPool } from "mysql2/promise";
import {
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
} from "../Settings/environments.js";

const createMyPool = () => {
  try {
    const pool = createPool({
      database: DB_NAME,
      password: "",
      user: DB_USER,
      host: DB_HOST,
      port: DB_PORT,
    });

    console.log("conexion exitosa a la base de datos");

    return pool;
  } catch (error) {
    console.log("HUBO UN ERROR AL CONECTAR CON LA BASE DE DATOS");
  }
};

const myPool = createMyPool();

export { myPool };
