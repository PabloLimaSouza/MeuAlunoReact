import React ,{useState} from "react";
import { Link } from "react-router-dom";
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
