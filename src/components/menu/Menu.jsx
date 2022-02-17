import React ,{useState, useContext} from "react";
import { Link } from "react-router-dom";
import { MenuItemAdmin, MenuItemCliente } from './MenuItem';
import StoreContext from '../../contexts/StoreContext';


const Menu = (props) => {
const [sidebar,setSidebar] = useState(false);
const showSidebar = () => setSidebar(!sidebar);
const { token, userLogged } = useContext(StoreContext);
console.log(userLogged);
 if(userLogged.tipoUsuario == 1){
    return (   
        <>    
       
        <nav className="nav-menu">
            <ul className="nav-menu-items">
                {MenuItemAdmin.map((item,index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>    
        </>   
        ) 
 }else {
    return (   
        <>    
       
        <nav className="nav-menu">
            <ul className="nav-menu-items">
                {MenuItemCliente.map((item,index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>    
        </>   
        ) 
 }


}

export default Menu;
