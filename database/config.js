import Mongoose from "mongoose";

export const dbConnection = async() => {

  try {
    
    await Mongoose.connect( process.env.BD_MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log("Base de Datos Online");

  } catch (error) {
    console.error(error);

    throw new Error('Error a la hora de Inicializar la BD');
  }

}