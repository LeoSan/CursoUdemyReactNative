const { FragmentsOnCompositeTypesRule } = require('graphql');
const colors = require('colors');
//Imprortamos la libreria para conectarnos a mongo DB usando Atlas 
const mongoose = require('mongoose');

//Crreamos nuestras variables de entorno que se alojaran en el archivo especificado
require('dotenv').config({path:'variables.env'});

const conectarDB = async () =>{

    try {

        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser:true, 
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true,

        });

        //Este mensaje nos indica si esta conectado 
        //console.clear();
        console.log(`!!!Base de Datos Conectada-> ${process.env.DB_USU} !!`.rainbow);
        
    } catch (error) {
        console.log(`<-|°_°|->`.red);
        console.log(`!!Hubo un error->`.red, error);
        process.exit(1); //Detiene la aplicación
    }
}

module.exports = conectarDB;