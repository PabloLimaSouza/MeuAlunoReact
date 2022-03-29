import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "../../contexts/StoreContext";
import { url } from "../../../src/variaveis";
import Loader from "../../utils/loader";

import "./Login.css";

function initialState() {
  return { Login: "", Senha: "" };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setToken } = useContext(StoreContext);
  const { setUserLogged} = useContext(StoreContext);
  const history = useHistory();
  const {token} = '';

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  function onSubmit(event) {
    debugger;
    event.preventDefault();  
    setLoading(true); 
    const response = fetch(`${ url }/api/usuario/login`, {
      //const response = fetch("https://localhost:44389/api/usuario/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => response.json())
      .then((response) => {
        if (response.jwt != null && response.dadosUsuario.login != null) {          
         setToken(response.jwt);
         setUserLogged(response.dadosUsuario);         
         return history.push("/");                        
        } else {
          console.log("Deu ruim");
          console.log(response.jwt);
          console.log(response.dadosUsuario);
          //setToken(response.jwt);
          setError(response);
        }
    //   }).catch(function(error) {
    //     console.log(error);
    //     setError("Não foi possível realizar login.");
    //     setLoading(false);
    // }); 
      }).then( () => {
        setLoading(false);
      });        
    console.log(response);
    setValues(initialState);
  }

  return (
    <div className="wrapper">
    <div className="user-login">      
      <h1 className="user-login__title">Acessar o Sistema</h1>
      <form onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="user">Usuário</label>
          <input
            id="user"
            type="text"
            name="Login"
            onChange={onChange}
            value={values.Login}
            required
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="Senha"
            onChange={onChange}
            value={values.Senha}
            required
          />
        </div>
        <div className="user-login__error">{error}</div>
        <button type="submit" className="user-login__submit-button" disabled={loading ? "disabled" : ''}>
          Entrar
        </button>
      </form>      
    </div>
    {loading ? 
    (
    <div id="loader">
      <Loader/>
    </div>
    ) 
    : false}
    
    </div>
  );
};

export default UserLogin;
