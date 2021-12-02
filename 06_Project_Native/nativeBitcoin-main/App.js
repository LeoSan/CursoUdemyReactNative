
import React,  {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import Header from './componets/Header';
import Formulario from './componets/Formulario';
import Cotizacion from './componets/Cotizacion';
import axios from 'axios';


export default function App() {

    //Generamos nuestros useSate
    const [moneda,    setMoneda] = useState('');    
    const [cripto,    setCripto] = useState('');  
    const [consultarAPI,  setConsultarAPI] = useState(false);  
    const [resultado,  setResultado] = useState(false);  
    const [cargando,  setCargando] = useState(false);  


    useEffect(()=>{
      
     const cotizarValor = async ()=>{

          if (consultarAPI === true ){
            console.log('Listo para consultar');

            const url       = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
            const resultado = await axios.get(url);
            setCargando(true);

            setTimeout(() => {

              setResultado( resultado.data.DISPLAY[cripto][moneda] );
              setConsultarAPI(false);            
              setCargando(false);
  
            }, 3000);

          }      

          
     }
     cotizarValor();

    }, [consultarAPI]) ; 

    //mostrar el spinner del componente
    const componente = cargando ? <ActivityIndicator size='large' color="#5E49E2"/> : <Cotizacion  resultado = {resultado} />;

  return (
    <>
    <ScrollView>
        <Header />
        <Image  
            style={styles.imagen}
            source={require('./assets/img/cryptomonedas.png')}
        />

        <View  style={styles.contenido}>
            <Formulario
                moneda    =   {moneda}
                cripto    =   {cripto}
                setMoneda =   {setMoneda}
                setCripto =   {setCripto}
                setConsultarAPI =   {setConsultarAPI}

            />
        </View>

        <View style={{ marginTop:40 }}>

          { componente }

        </View>
        

      </ScrollView>        
    </>

  );
}

const styles = StyleSheet.create({
  imagen: {
    width:'100%',
    height:150,
    marginHorizontal:'2.5%',

  },
  contenido:{
     marginHorizontal:'2.5%',
  }
});
