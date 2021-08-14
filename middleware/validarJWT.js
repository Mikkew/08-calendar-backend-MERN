import { request, response } from "express";
import * as jwt from "jsonwebtoken";


const validarJWT = (req = request, res = response, next) => {
  
  const token = req.header('token');

  if ( !token) {
    
    return res.status(401).json({
      ok: false,
      msg: 'Error en el Token'
    });
  }

  try {

    const { username, uid, name, lastName, email } = jwt.verify( token, process.env.SECRET_JWT_SEED );
    
    req.uid = uid;
    req.email = email;
    req.username = username;
    req.name = name;
    req.lastName = lastName;

  } catch (error) {
    
    return res.status(401).json({
      ok: false,
      msg: 'Error en el Token'
    });
    
  }

  next();
}

export default validarJWT;