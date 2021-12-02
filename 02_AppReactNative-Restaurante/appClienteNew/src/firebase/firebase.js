import app from 'firebase/app'; //Importa nuestra app de firebase 
import 'firebase/firestore'; 

//Paso 1-> Para usar la subida de archivos 
import 'firebase/storage';

import firebaseConfig from './config'; //Importa la configuración de firebase 

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.db = app.firestore();
        //Paso 2-> Para usar la subida de archivos 
        this.storage = app.storage();
    }
}


const firebase = new Firebase();
export default firebase;