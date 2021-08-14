import express from 'express';
import dotenv from "dotenv";
import cors from "cors";

import { dbConnection } from './database/config';
import { auth } from './routes/auth';
import { events } from './routes/events';

// Variables de Entorno
dotenv.config();
const ENV = process.env;

// Conexion a la Base de Datos
dbConnection();

//Crear un servidor
const app = express();

//Directorio Publico
app.use( express.static('public') );

//CORS
app.use( cors() );

// Lectura y paseo del body
app.use( express.json() );

//Rutas
app.use('/api/v1/auth', auth);
app.use('/api/v1/events', events);


app.listen( ENV.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${ENV.PORT}`);
});