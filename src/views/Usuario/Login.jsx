import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "../../contexts/StoreContext";

import "./Login.css";

function initialState() {
  return { Login: "", Senha: "" };
}

function login(values) {
  if (values.Login !== '') {
    return { token: values};
  }
  return { error: 'Usuário ou senha inválido' };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const { setToken } = useContext(StoreContext);
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
    event.preventDefault();   
    
    const response = fetch("https://localhost:44389/api/usuario", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.login !== "") {                  
         const { token, error } = login(response); 
         setToken(token);
         return history.push("/");
         console.log(token) ;   
         console.log('deubom');                  
        } else {
          console.log("Deu ruim");
        }
      });   
      
    setError(error);
    setValues(initialState);
  }

  return (
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
          />
        </div>
        {error && <div className="user-login__error">{error}</div>}
        <button type="submit" className="user-login__submit-button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
