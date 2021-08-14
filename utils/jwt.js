import * as jwt from "jsonwebtoken";


const generarJWT = ( uid, username, name, lastName, email ) => {

  const payload = { uid, username, name, lastName, email };

  return new Promise((resolve, reject) => {
  
    jwt.sign( payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '24h'
    }, (err, token) => {
  
      if( err ) {
        reject( err );
      } else {
        resolve( token );
      }
    });

  });

}

export default generarJWT;