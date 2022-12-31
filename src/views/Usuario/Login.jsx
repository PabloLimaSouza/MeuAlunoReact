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
    const response = fetch(`${url}/api/v1/login/forgotPassword`, {
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
          text: response.message });
        }
      });
  }

  function onSubmit(event) {
    event.preventDefault();
    document.getElementById("div-loading").style.display = "block";
    const response = fetch(`${url}/api/v1/login`, {
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
   
    <div className="rf-page__login">
      <div className="rf-login__form">
        <img className="rf-logo" src="https://i.imgur.com/LbUVpGb.png" />
        <div className="rf-wid-100 --mg-20-0 --divider"></div>
        <p className="rf-wid-100">Área restrita a usuários administrativos</p>
        <div className="rf-wid-100 rf-form --inputs">
          <form className="rf-wid-100 --fcol --fgap-10" onSubmit={onSubmit}>
            <div className="rf-wid-100">
              <TextField
                id="user"
                name="Login"
                placeholder="E-mail"
                required={true}
                onChange={onChange}
                value={values.Login}
                variant="outlined" className="rf-wid-100 user-login__form-control"/>
            </div>
            <div className="rf-wid-100">
              <TextField
                id="password"
                placeholder="Senha"
                name="Senha"
                type="password"
                required={true}
                onChange={onChange}
                value={values.Senha}
                variant="outlined"
                className="rf-wid-100 user-login__form-control" />
            </div>

            <div className="user-login__error">{error}</div>
            <button type="submit" className="rf-wid-100 rf-button-color-client" disabled={loading ? "disabled" : ''}>
              Entrar
            </button>
            <a href="#" className="rf-wid-100" onClick={recuperarSenha}>Esqueceu a Senha?</a>
          </form>
        </div>
      </div>
      <div className="rf-login__welcome">
        <h1>Bem-vindo ao Meus Alunos</h1>
        <div className="rf-wid-10 --mg-20-0 --divider"></div>
        <p className="--font-09 --frow-center --fgap-10"><span className="rf-icon-notification"></span>Para acessar, faça login ao lado</p>
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
