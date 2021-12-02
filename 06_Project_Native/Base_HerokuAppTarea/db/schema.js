//Importamos el Servidor apollo 
const {  gql }= require('apollo-server');

//Definimos typesDefs -> Es la forma que graphQL trabaja  con apollo 
//Recuerda que los query tambien tienen que estar en tu resolver 
const typeDefs  = gql`
    type Curso {
        titulo:String,
        tecnologia:String
    }

    type Tecnologia {
        tecnologia:String
    }
    
    type Query{
        #Proyecto
        obtenerCursos: [Curso]
        obtenerTecnologia: [Tecnologia]
        obtenerProyectos : [Proyecto]
        #Tarea
        obtenerTareas(input: ProyectoIDInput) : [Tarea]
    }

    type Token {
        token:String
    }    
    
    type Proyecto {
        nombre:String
        id:ID
    }

    type Tarea {
        nombre:String
        id:ID
        proyecto: String
        estado: Boolean
    }    


    input UsuarioInput {
        nombre:String!
        email:String!
        password:String!
    }

    input AutenticarInput {
        email:String!
        password:String!
    }

    input ProyectoInput{
        nombre:String!
    }

    input TareaInput{
        nombre:String!
        proyecto: String
    }

    input ProyectoIDInput{
        proyecto:String!
    }

    type Mutation {
        #Usuarios 
        crearUsuario(input:UsuarioInput) : String
        autenticarUsuario(input: AutenticarInput ): Token
        
        #Proyectos 
        nuevoProyecto(input:ProyectoInput):Proyecto
        actualizarProyecto( id : ID!, input:ProyectoInput):Proyecto
        eliminarProyecto(id: ID!) : String

        #Tareas
        nuevaTarea(input: TareaInput ) : Tarea
        actualizarTarea(id: ID!, input: TareaInput, estado:Boolean) : Tarea
        eliminarTarea( id : ID! ) : String

    }
`; 

module.exports = typeDefs;