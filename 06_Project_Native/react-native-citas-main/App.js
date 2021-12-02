import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Platform } from 'react-native';
import Citas from './component/Citas';
import Formulario from './component/Formulario';

 const App = () => {


  const [mostrarForm, guardarmostrarForm] = useState(false);
  const [nomBoton,    guardarnomBoton] = useState('Crear Cita');



  //definir el state
  const [citas, setCitas] = useState([
    {id:1, paciente: "Hook",       propietario:'Leo01', sintomas: "No come"   }, 
    {id:2, paciente: "Redux",      propietario:'Leo02', sintomas: "No Duerme" }, 
    {id:3, paciente: "Context",    propietario:'Leo03', sintomas: "No Canta"  }, 
    {id:4, paciente: "StyleSheet", propietario:'Leo04', sintomas: "No camina" }, 
  ]); 


 /*Notas Importantes */
 // Los Flat List tienen propiedades de que permiten manupular los datos de un objeto e iterarlo
 //Data -> Puedes pasar un objeto 
 //renderItem -> funciona como un for, map, foreach pero para poder acceder a el debemos usar la propiedad item ejemplo citas.item.nombre 
  

//Elimina los pacientes del state 
const eliminaPaciente = id =>{
  setCitas( (citasActuales) => {
    return citasActuales.filter(cita => cita.id !== id ); 
  })

}

//Mostrar o Ocultar Formulario
const mostrarFormulario = () =>{
  guardarmostrarForm(!mostrarForm);
  if (nomBoton === 'Crear Cita') guardarnomBoton('Ver Citas');
  if (nomBoton === 'Ver Citas') guardarnomBoton('Crear Cita');

}

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Genera Tu Cita</Text>

            <View>
                <TouchableHighlight style={styles.btnMostrarForm} onPress={ () => mostrarFormulario() }>
                    <Text style={styles.TextoForm}> {nomBoton}  &times;</Text>
                </TouchableHighlight>
            </View>

          
          {mostrarForm ? (
            <Formulario 
              citas={citas}
              setCitas={setCitas} 
              guardarmostrarForm = {guardarmostrarForm}/>
          ):(
            <>
            <Text style={styles.titulo}>  {citas.length > 0 ? 'Administra tus Citas': 'Disculpe, No Tines Citas'}  </Text>
          
            <FlatList 
              
              data={citas}
              keyExtractor={cita => cita.id}
              renderItem = { ({item}) => <Citas item={item}  eliminaPaciente={eliminaPaciente} />}
            />
            </>
          )}


    </View>
  );
}
/*Forma de anexar estilos */

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor:'#134484',
    flex:1
  }, 
  titulo:{
    color:'#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 30, 
    fontSize:24, 
    fontWeight:'bold', 
    textAlign:'center',
    marginBottom:20,

  }, 
  conenido:{
    flex:1, 
    marginHorizontal:'2.5%',
  }, 
  listado:{
    flex:1, //Tome todo el contenido del telefono
  },
  btnMostrarForm:{
    padding:10, 
    backgroundColor:'#4630eb',
    marginVertical:10, 

},
TextoForm:{
    color:'#FFF',
    fontWeight:'bold', 
    textAlign:'center',

}  
  

  
})

export default App;