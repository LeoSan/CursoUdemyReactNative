import React,  {Fragment} from 'react';
import {Link, NavLink} from 'react-router-dom';

const SideBar = () => {
    return ( 
            <Fragment>
                   <div className="md:w-2/5 xl:w-1/5 bg-gray-800"> 
                        <div className="p-6">
                                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold" >Restautante App</p>

                                <p className="mt-3 text-gray-600 ">Administra tu Restaurante en las siguientes opciones</p>

                                <nav className="mt-10" >
                                       <NavLink activeClassName="text-yellow-100" className="p-1 text-gray-300 block hover:bg-yellow-500"  exact="true"  to="/">Ordenes</NavLink>                                   
                                       <NavLink activeClassName="text-yellow-100" className="p-1 text-gray-300 block hover:bg-yellow-500"  exact="true"   to="/menu">Menu</NavLink>                                   
                                </nav>

                        </div>
                   
                   </div>
            </Fragment>
        
     );
}
 
export default SideBar;