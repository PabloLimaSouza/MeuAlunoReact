import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "../../contexts/StoreContext";
import { url } from "../../../src/variaveis";
import Loader from "../../utils/loader";
import { 
  TextField, DialogTitle,  DialogContent,  DialogContentText, 
  Dialog,
} from "@material-ui/core";

import "./Login.css";

function initialState() {
  return { Login: "", Senha: "", UsuarioEmail: "" };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setToken } = useContext(StoreContext);
  const { setUserLogged } = useContext(StoreContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  const alertas = {
    text: "",
    title: ""
  }
const [mensagem, setMensagem] = useState(alertas);

const handleClose = () => {
  debugger;
  setOpen(false);
};

  function recuperarSenha(){
    setMensagem({ ...values, title: "ESQUECEU SUA SENHA DE ACESSO?", 
    text: "Informe seu e-mail de cadastro:" });
    setOpen(true);   
  }

  function enviarEmail(){
    
    document.getElementById("div-loading").style.display = "block";
    document.getElementById("btn-enviar-email").innerHTML = "Aguarde...";
    document.getElementById("btn-enviar-email").disabled = true;
    const response = fetch(`${url}/api/usuario/forgotPassword`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => response.json())      
      .then(() => {
        document.getElementById("div-loading").style.display = "none";
        document.getElementById("btn-enviar-email").disabled = false;

        if(response.error == true){
          document.getElementById("UsuarioEmail").style.display = "none";
          setMensagem({ ...values, title: "RECUPERAÇÃO DE SENHA", 
          text: response.message });
        
        }else{
          setMensagem({ ...values, title: "RECUPERAÇÃO DE SENHA", 
          text: "Para recuperar sua senha, enviamos um link para seu e-mail cadastrado." });
        }
      });
  }

  function onSubmit(event) {
    event.preventDefault();
    document.getElementById("div-loading").style.display = "block";
    const response = fetch(`${url}/api/usuario/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => response.json())
      .then((response) => {
        document.getElementById("div-loading").style.display = "none";
        if (response.jwt != null && response.dadosUsuario.login != null) {
          setToken(response.jwt);
          setUserLogged(response.dadosUsuario);
          return history.push("/");
        } else {
          setError(response);
        }
      }).then(() => {
        setLoading(false);
      });
    setValues(initialState);
  }

  return (
   
    <div>
      <img className="logotipo" src="https://i.imgur.com/LbUVpGb.png" />
      <div className="wrapper">
        <div className="user-login">
          <h1 className="user-login__title">FAZER LOGIN</h1>
          <form onSubmit={onSubmit}>
            <div className="user-login__form-control">
              <TextField
                id="user"
                name="Login"
                label="E-mail"
                required={true}
                onChange={onChange}
                value={values.Login}
                variant="outlined" />
            </div>
            <div className="user-login__form-control">
              <TextField
                id="password"
                name="Senha"
                label="Senha"
                type="password"
                required={true}
                onChange={onChange}
                value={values.Senha}
                variant="outlined"
                className="user-login__form-control" />
            </div>

            <div className="user-login__error">{error}</div>
            <button type="submit" className="user-login__submit-button" disabled={loading ? "disabled" : ''}>
              Entrar
            </button>
            <a href="#" className="btn-recuperar-senha" onClick={recuperarSenha}>Esqueceu a Senha?</a>
          </form>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="dialog-title">{mensagem.title}</DialogTitle>
        <DialogContent>
          <DialogContentText className="dialog-message" id="alert-dialog-description">
            {mensagem.text}
          </DialogContentText>
          {
          mensagem.title == "ESQUECEU SUA SENHA DE ACESSO?" ? 
          <TextField
                id="UsuarioEmail"
                name="UsuarioEmail"
                label="E-mail" 
                type="email"               
                required={true}
                onChange={onChange}
                value={values.UsuarioEmail}
                variant="outlined"
                className="user-login__form-control" /> : false }
        </DialogContent>
        {
          mensagem.title == "ESQUECEU SUA SENHA DE ACESSO?" ? 
          <button id="btn-enviar-email" className="user-login__submit-button" onClick={enviarEmail}>ENVIAR</button> :
          <button className="user-login__submit-button" onClick={handleClose}>Ok</button>
        }

      </Dialog>
    <Loader />
    </div>
    
  );
};

export default UserLogin;
