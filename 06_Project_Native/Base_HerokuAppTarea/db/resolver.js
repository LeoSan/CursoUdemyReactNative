//Importamos modelo
const Usuario = require('../models/Usuario');
const Proyecto = require('../models/Proyecto');
const Tarea    = require('../models/Tarea');
//Importamos Librerias 
const bcryptjs = require('bcryptjs');

//Importo jwebtoken 
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'variables.env'});


//Usamos este arreglo de ejemplo pero sera reemplazado luego 
const cursos = [
    {
        titulo: 'JavaScript',
        tecnologia:'JS'
    },    
    {
        titulo: 'Pre procesador ',
        tecnologia:'PHP'
    },    
    {
        titulo: 'Lenguaje de marcador de hipertexto',
        tecnologia:'HTML'
    },
];


//Creamos nuestro metodo token 
const crearToken = (usuario, secreta, expiresIn)=>{
    const {id, email, nombre } = usuario; 

    return jwt.sign( {id, email, nombre}, secreta, {expiresIn} );
}

//Definimos resolvers -> Es la forma que graphQL trabaja  con apollo 
//Los resolver son funciones para emplear la consulta de query, 
// vease que se usa el mismo nombre que se uso en los typeDefs
//Las funciones tiene que estar en ambos lados 
const resolvers = {
    Query:{
        obtenerCursos:()=> cursos,
        obtenerTecnologia:()=> cursos,

        //Manera de generar una consulta 
        obtenerProyectos: async (_, {}, ctx) => {

            let nombre = "Comprar Comida actualizada"; 
            const proyectos = await Proyecto.find( { nombre: nombre} );

            return proyectos;
        },
        obtenerTareas: async (_, { input }, ctx) => {//Mosca aqui no funciono la cosa de pasar context
            const tareas  =  await Tarea.find({ proyecto:"60e4ddc99780652f1c4cf40c"} ); 

            return tareas;
        }
       
    },
     Mutation:{
        /*
            Definición de parametros -> todo lo que es actualización creación y eliminación va en la mutation 
            _       -> Es el root no usa pero juan le pone _  -> Primero ó root 
            {input} -> son los argunmentos que se le  pasa a ese valor nos permite leer lo que le pase al usuario en el GrapgQL -> Segundo  
            ctx     -> Se le conoce como el context es un objeto que se comparte en todos los resolver es excelente para saber que usuairo esta autenticado -> Tercero 
            info    -> Información ques es relavante al querry usado -> Juan nunca lo usa asi que toca imvestigar 
        */

        //crearUsuario:( primero,segundo,tercero, cuarto )=>{
        crearUsuario: async ( _,{input}, ctx )=>{
            
            const {email, password} = input;
            
            const existeUsuairo  = await Usuario.findOne({ email});
            
            console.log(existeUsuairo);

            //Si el usuario existe 
            if( existeUsuairo ){
                throw new Error('El usuario ya esta registrado');
            }
            
            try {
                //Hachear pass 
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt);


                //Registro usuario 
                const nuevoUsuario = new Usuario(input);
                console.log("Usuario creado");
                nuevoUsuario.save();
                return "Usuario creado correctamente";
            } catch (error) {
                console.log(error);
                
            }


            /*console.log(_);
            console.log(input);
            console.log(ctx);
            console.log('Creando usuario ');*/
        },
         
        autenticarUsuario:  async (_, {input}) => {
            const { email, password} = input;

            // Si el usuario existe
            const existeUsuario = await Usuario.findOne({ email });

            // si el usuario existe
            if(!existeUsuario) {
                throw new Error('El Usuario no existe');
            }

            // Si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if(!passwordCorrecto) {
                throw new Error('Password Incorrecto');
            }

            // Dar acceso a la app
            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '4hr' )
            }
        },
        nuevoProyecto: async (_, {input}, ctx) => {

            console.log("Desde Crear Proyecto", ctx);
            try {
                const proyecto = new Proyecto(input);

                // asociar el creador
              //  proyecto.creador = ctx.usuario.id;

                // almacenarlo en la BD
                const resultado = await proyecto.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        actualizarProyecto: async (_, {id, input}, ctx) => {
            // Revisar si el proyecto existe o no

            console.log('Desde Actualizar', ctx);
            let proyecto = await Proyecto.findById(id);

            if(!proyecto) {
                throw new Error('Proyecto no encontrado');
            }

            // Revisar que si la persona que trata de editarlo, es el creador
          /*  if(proyecto.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar');
            }
          */
            // Guardar el proyecto
            proyecto = await Proyecto.findOneAndUpdate({ _id: id}, input, { new: true });
            return proyecto;
        },
        eliminarProyecto: async (_, {id}, ctx) => {
            // Revisar si el proyecto existe o no
            let proyecto = await Proyecto.findById(id);

            if(!proyecto) {
                throw new Error('Proyecto no encontrado');
            }

            // Revisar que si la persona que trata de editarlo, es el creador
           /* if(proyecto.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar');
            }
            */
            // Eliminar
            await Proyecto.findOneAndDelete({ _id : id });

            return "Proyecto Eliminado";

        },  
        nuevaTarea: async ( _,{input}, ctx )=>{

            console.log("Desde Crear Tarea", ctx);
            try {
                const tarea = new Tarea(input);

                // asociar el creador
              //  proyecto.creador = ctx.usuario.id;

                // almacenarlo en la BD
                const resultado = await tarea.save();
                //Retornar reu
                return resultado;
            } catch (error) {
                console.log(error);
            }

        },        
        actualizarTarea: async ( _,{id, input, estado}, ctx )=>{

            console.log('Desde Actualizar Tarea', ctx);
            let tarea = await Tarea.findById(id);

            if(!tarea) {
                throw new Error('Tarea no encontrada');
            }

            // Revisar que si la persona que trata de editarlo, es el creador
          /*  if(tarea.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar');
            }
          */
            input.estado = estado

            tarea
            // Guardar el proyecto
            tarea = await Tarea.findOneAndUpdate({ _id: id}, input, { new: true });
            return tarea;

        },
        eliminarTarea: async (_, {id}, ctx) => {
            
            console.log('Desde Eliminar Tarea');
            
            let tarea = await Tarea.findById(id);

            if(!tarea) {
                throw new Error('Tarea no encontrada');
            }

            // Revisar que si la persona que trata de editarlo, es el creador
          /*  if(tarea.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar');
            }
          */
           
            // Eliminar Tarea
            await Tarea.findOneAndDelete( { _id: id } );
            
            return "Tarea Eliminada"; 

        }
        
        
    }


}

module.exports = resolvers;