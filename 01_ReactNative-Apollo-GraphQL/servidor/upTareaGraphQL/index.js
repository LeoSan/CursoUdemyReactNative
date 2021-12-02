//Importamos el Servidor apollo  y librerias 
const { ApolloServer }= require('apollo-server');
require("colors");                      //--> Manejo de color en terminal 
const jwt = require('jsonwebtoken');   //--> Manejo de token 

require('dotenv').config('variables.env');

//Importamos nuestros TypeDef esto es luego de moverlo a su ubicación -> es  mucho mejor el mantenimiento 
const typeDefs = require('./db/schema');

//Importamos nuestros resolver esto es luego de moverlo a su ubicación -> es  mucho mejor el mantenimiento 
const resolvers = require('./db/resolver');

//Importamos conexión de base de datos
const conectarDB = require('./config/db');

conectarDB();

//Defino e Instancio apollo -> Apollo server obligatoriamente se deben definir los typesDefs y resolver sin esto no funciona 

// Iniciar servidor appollo
const server = new ApolloServer(
    {
        typeDefs, 
        resolvers,
        context: ({req}) => {
            // Obtenemos el token
            const token = req.headers['authorization'] || '';
            // Nota: Validamos si esta autenticado  o no
           // console.log(token)
            //  console.log(req.headers)
            
            // Si hay un token
            if(token){
                try {
                    const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
                    // Obtenemos los valores del usuario autenticado
                    return {
                        usuario
                    }
                   //  console.log(usuario);
          
                    
                }catch (error){
                    console.log(error)
                }
            }
        }
    });
    
//Definimos el escuchador  
server.listen().then( ({url})=>{
    console.log(` ${'<-|°.°|->'.bgBlue} °°° Servidor Ejecutandose °°° ${'En la URL ->'.blue} ${url}`);
} ); 


//configuración Para Heroku
server.listen({ port:process.env.PORT || 4000  }).then( ({url})=>{
    console.log(` ${'<-|°.°|->'.bgBlue} °°° Servidor Ejecutandose °°° ${'En la URL ->'.blue} ${url}`);
} )  

