import React ,{useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { MenuItem } from './MenuItem'


const Menu = (props) => {
const [sidebar,setSidebar] = useState(false);
const showSidebar = () => setSidebar(!sidebar);

return (   
    <>    
   
    <nav className="nav-menu">
        <ul className="nav-menu-items">
            {MenuItem.map((item,index) => {
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

export default Menu;
