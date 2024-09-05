import { body } from "express-validator";

export const createUserValidation = [
  body("nombre_Alumno")
    .isLength({ max: 20, min: 5 })
    .withMessage(
      "El nombre tiene que tener como minimo 5 letras y como maximo 20"
    )
    .isString()
    .withMessage("El nombre tiene que ser string")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio"),
  body("Direccion")
    .isString()
    .withMessage("La direccio tiene que ser string")
    .notEmpty()
    .withMessage("La direccion no puede estar vacia"),
];

export const updateUserValidation = [
  body("nombre_Alumno")
    .isLength({ max: 20, min: 5 })
    .withMessage(
      "El nombre tiene que tener como minimo 5 letras y como maximo 20"
    )
    .isString()
    .withMessage("El nombre tiene que ser string")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio"),
  body("Direccion")
    .isString()
    .withMessage("La direccio tiene que ser string")
    .notEmpty()
    .withMessage("La direccion no puede estar vacia"),
];
