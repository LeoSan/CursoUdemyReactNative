import React, {useState, useEffect} from 'react'; 
import {Text, StyleSheet, Platform, View, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';


const Formulario = ({moneda, cripto, setMoneda, setCripto, setConsultarAPI}) => {

  
    const [criptos,   setCriptos] = useState([]);    


    
    //Listado de eventos 
    //Este evento guarda la seleccion en el state 
    const obtenerMoneda = (moneda)=>{
        console.log(moneda);
        setMoneda(moneda);
    }


    //Almacena en el state la opción del usuario. 
    const obtenerCripto = (cripto)=>{
        console.log(cripto);
        setCripto(cripto);
    }    

    //
    const cotizarPrecio =()=>{

        console.log("cotizando");
        if( moneda.trim() ==='' || cripto.trim() === '' ){
            
            console.log("cotizando entro en validador");
            mostrarAlerta();
            return;
        }

        //cambiar el state  del API
        setConsultarAPI(true);

    }

    //Motrar alertas usando el componentes 
    const mostrarAlerta = ()=>{
        Alert.alert(
            'Error..',
            'Ambos campos  son obligatorios', 
            [
                {text:'Ok'}
            ]
        )
    }


    useEffect(()=>{

        const consultarAPI = async ()=>{

            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            console.log(resultado.data.Data);
            setCriptos(resultado.data.Data);
            //setCriptos( Object.entries(resultado.data.Data) );

        }
        
        consultarAPI();



    }, []); //[]Arreglo de dependencias 




    return(
           <View>
               <Text style={styles.label}>Moneda</Text>
               <Picker
                    selectedValue={moneda}
                    onValueChange={ moneda => obtenerMoneda(moneda)  }
                    itemStyle={{height:120}}
               >
                    <Picker.Item label="- Seleccione -"       value="" />                    
                    <Picker.Item label="- Dolar USA -"        value="USD" />                       
                    <Picker.Item label="- Peso Mexicano -"    value="MXN" />   
                    <Picker.Item label="- Euro -"             value="EUR" />                       
                    <Picker.Item label="- Libra Esterlina -"  value="GBP" />                                           
                </Picker> 

               <Text style={styles.label}>Tipos Crip</Text>

               <Picker
                    selectedValue={ cripto }
                    onValueChange={ cripto => obtenerCripto(cripto)  }
                    itemStyle={{height:120}}
               >
                    <Picker.Item label="- Seleccione -"       value="" /> 
                    { 
                        criptos.map( listado => (
                            <Picker.Item key={ listado.CoinInfo.Id } label = { listado.CoinInfo.FullName }  value={listado.CoinInfo.Name} />   
                        ))
                        
                    }                                       

                                         
                </Picker>
                <TouchableHighlight
                    style={styles.btnCotizar}
                    onPress={ () =>cotizarPrecio() }
                >
                     <Text style={styles.txtCotizar}> Calcular </Text>    
                </TouchableHighlight>                
           </View>        
    );
};


//Aqui los estilos que vamos a usar 
const styles = StyleSheet.create({
 label:{
     //cd fontFamily:'Arial', 
     textTransform: 'uppercase',
     fontSize:22,
     marginVertical:20, 
       
 }, 
 btnCotizar:{
    backgroundColor:'#5E49E2',
    padding:10,
    marginTop:20,
    
 }, 
 txtCotizar:{
    color:'#FFF',
    fontSize:18,
    textTransform:'uppercase',
    textAlign:'center',


 }

})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

export default Formulario; 