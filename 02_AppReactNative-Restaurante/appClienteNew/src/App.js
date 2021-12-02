//Librerias 
import React from 'react';
import {Routes, Route} from 'react-router';

//Importamos la BD - Firebase 
import firebase, {FirebaseContext} from './firebase/index';


//Vistas 
import Ordenes       from './components/paginas/Ordenes';
import Menu          from './components/paginas/Menu';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';

//componentes UI
import SideBar from './components/ui/Sidebar';


//App Principal 
function App() {
  
  //Esta clase permite que quede menu izqueirda y contenido en el centro className="md:flex flex min-h-screen" 
  return (
    <FirebaseContext.Provider
      value={{
        firebase //Es la clase e instncia la configuracion 
      }}
    >
        <div className="md:flex flex min-h-screen">
            <SideBar/>
            <div className="md:w-3/5 xl:w-4/5 p-6">
            
            <Routes>
                <Route  path="/" element={ <Ordenes/> } />
                <Route  path="/menu" element={ <Menu/> } />
                <Route  path="/nuevo-platillo" element={ <NuevoPlatillo/> } />
                </Routes>       
                
            </div>
        </div>
    </FirebaseContext.Provider>



  );
}

export default App;
