import React ,{useState, useContext} from "react";
import { Link } from "react-router-dom";
import { MenuItemAdmin, MenuItemCliente } from './MenuItem';
import StoreContext from '../../contexts/StoreContext';


const Menu = (props) => {
const [sidebar,setSidebar] = useState(false);
const showSidebar = () => setSidebar(!sidebar);
const { token, userLogged } = useContext(StoreContext);

 if(userLogged.tipoUsuario == 1){
    return (   
        <div className="rf-menu__content">    
            {MenuItemAdmin.map((item,index) => {
                return (
                    <div key={index} className={"rf-wid-100"}>
                        <Link to={item.path} className={"rf-wid-100"}>
                            <span className={item.cName}>{item.title}</span>
                        </Link>
                    </div>
                )
            })}
        </div>   
        ) 
 }else {
    return (   
        <>    
            {MenuItemCliente.map((item,index) => {
                return (
                    <div key={index} className={"rf-wid-100"}>
                        <Link to={item.path} className={"rf-wid-100"}>
                            <span className={item.cName}>{item.title}</span>
                        </Link>
                    </div>
                )
            })}  
        </>   
        ) 
 }


}

export default Menu;
