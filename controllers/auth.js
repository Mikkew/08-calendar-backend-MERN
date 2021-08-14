import { request, response } from "express";
import bcrypt from "bcryptjs";

import Usuario from "../models/Usuario";
import generarJWT from "../utils/jwt";

export const crearUsuario = async(req =  request, res = response ) => {

  const { email, username, password, name, lastName } = req.body;

  try {

    const usuario = await Usuario.findOne({ email: email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya existe",
      });
    }

    // Crear Usuario de BD
    const dbUser = new Usuario(req.body);
    const { name, lastName, username, id } = dbUser;

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    // General el JWT
    const token = await generarJWT(dbUser.uid, username);

    // Crear Usuario de BD
    await dbUser.save();
    
     //Generar Respuesta Exitosa
    return res.status(201).json({
      ok: true,
      msg: "registro",
      uid: id,
      email,
      name,
      username,
      lastName,
      token
    });

  } catch (error) {
    
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
  

};


export const loginUsuario = async (req = request, res = response ) => {
  const { email, password } = req.body;
  
  try {
    const dbUser = await Usuario.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "El correo no existe",
      });
    }

    const validPassword = bcrypt.compareSync(password, dbUser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña Incorrecta",
      });

    }

    const token = await generarJWT(
      dbUser._id,
      dbUser.username,
      dbUser.name,
      dbUser.lastName,
      dbUser.email
    );

    return res.json({
      ok: true,
      uid: dbUser._id,
      email: dbUser.email,
      name: dbUser.name,
      lastName: dbUser.lastName,
      token,
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }

};


export const revalidarToken = async(req = request, res = response ) => {
  const { username, uid, name, lastName, email } = req;

  const token = await generarJWT(uid, username, name, lastName, email);
  
  return res.json({
    ok: true,
    uid,
    email,
    username,
    name,
    lastName,
    token,
  });

};