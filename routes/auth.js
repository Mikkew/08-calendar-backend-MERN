import { Router } from 'express';
import { check } from 'express-validator';

import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/auth';
import { validarCampos } from '../middleware/validar-campos';
import validarJWT from '../middleware/validarJWT';



const router = Router();

//Creacion de Usuarios
router.post(
  '/new', 
  [
    check('email', "El email es obligatorio")
      .isEmail()
      .not()
      .isEmpty(),
    check('username', "El username es obligatoio")
      .isAlphanumeric()
      .not()
      .isEmpty(),
    check('password', "La contraseña es obligatorio")
      .isLength({ min: 5})
      .not()
      .isEmpty(),
    check('name', "El name es obligatorio")
      .not()
      .isEmpty(),
    check('lastName', "El last Name es obligatorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearUsuario);

//Login de Usuarios
router.post(
  '/',
  [ 
    check('email', "El email es obligatorio")
      .isEmail()
      .not()
      .isEmpty(), 
    check('password', "La contraseña es obligatoria")
      .isAlphanumeric()
      .isLength({ min: 6 })
      .not()
      .isEmpty(), 
    validarCampos
  ], 
  loginUsuario );

//Validar o Revalidar Token
router.get(
  '/renew', 
  validarJWT,
  revalidarToken);

export { router as auth };