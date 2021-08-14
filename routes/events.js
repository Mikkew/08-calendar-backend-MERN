import { Router } from "express";
import { check } from 'express-validator';

import {
  actualizarEventos,
  crearEventos,
  eliminarEventos,
  getEvento,
  getEventos,
} from "../controllers/events";
import isDate from '../utils/isDate';
import validarJWT from "../middleware/validarJWT";
import { validarCampos } from "../middleware/validar-campos";

const router = Router();

//Obtener Eventos
router.get(
  "/", 
  validarJWT,
  getEventos);

//Crear Eventos
router.post(
  "/", 
  [
    check('title', "El titulo es obligatorio")
      .not()
      .isEmpty(),
    check('start', "La Fecha de Inicio es obligatoria")
      .custom( isDate ),      
    check('end', "La Fecha de Fin es obligatoria")
      .custom( isDate ),      
    validarJWT,
    validarCampos,
  ],
  crearEventos);

router.get(
  "/:id", 
  validarJWT,
  getEvento);

router.put(
  "/:id", 
  validarJWT,
  validarCampos,
  actualizarEventos);

router.delete(
  "/:id",
  validarJWT, 
  eliminarEventos);

export { router as events };