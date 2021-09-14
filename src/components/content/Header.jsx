import React , { useContext }from "react";
import StoreContext from '../../contexts/StoreContext';


const Header = () => {
  const { token, setToken} = useContext(StoreContext);
  console.log(token);
  return (    
    <div className="Header">
      <label for="head-empresas" className="head-empresa">Empresa</label>
      <select name="head-empresas" id="head-empresas"> 
        <option value={token.pessoa.empresa.razaoSocial}>{token.pessoa.empresa.razaoSocial}</option>              
      </select>
      <label>Olá </label>
      <strong>{token.pessoa.nome}</strong>
      <button type="button" onClick={ () => setToken(null)}>Sair</button>
    </div>
    
  );
};

export default Header;
