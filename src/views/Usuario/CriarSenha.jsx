import React, {useState} from "react";
import Loader from "../../utils/loader";
import { url } from "../../../src/variaveis";
import { TextField, Button, DialogTitle, DialogContent, DialogContentText, Dialog } from "@material-ui/core";
import { useHistory } from "react-router";

import "./CriarSenha.css";

const CriarSenha = () => {

    const initialValues = {
        senha: "",
        senhaConfere: ""        
    }
    const [values,setValues] = useState(initialValues);
    const [open, setOpen] = useState(false);
    const alertas = {
        text: "",
        title: ""
      }
    const [mensagem, setMensagem] = useState(alertas);
    const history = useHistory();

    function handleClose() {
        setOpen(false);
      };
   
    function handleChange(e) {
        const { value, name } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };        
    
    function onSubmit(event) {
        debugger;
        event.preventDefault();
        if (values.senha != values.senhaConfere) {
            setMensagem({ ...values, title: "Alerta!", text: "As senhas informadas devem ser iguais" });
            setOpen(true);            
        } else {
            document.getElementById("div-loading").style.display = "block";
            var userData = window.location.search;
            var urlParams = new URLSearchParams(userData);
            const body = {
                UsuarioEmail: urlParams.get('email'),
                ResetToken : urlParams.get('token'),       
                NewPassword: values.senha,   
            }
            body.ResetToken = body.ResetToken.replace(' ','+');
            
            const response = fetch(`${url}/api/v1/login/resetPassword`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            })
            .then( async (response) => {
                if(response.ok){
                  let data = await response.json();
                  setMensagem({ ...values, title: "Sucesso!", text: data.message })
                  setOpen(true);
                }else{
                  let data = await response.json();
                  setMensagem({ ...values, title: "Erro!", text: data.message })
                  setOpen(true);
                }
              })
              .catch((err) => {
                  console.log(err);
              })
              document.getElementById("div-loading").style.display = "none";  
        }
     };

    return (
        
            <>
            <img className="logotipo" src="https://i.imgur.com/LbUVpGb.png" />
            <div className="wrapper">
            <div className="user-login">
                <h1 className="user-login__title">Criar nova senha</h1>
                <form>   
                <div className="user-login__form-control">                 
                    <TextField
                        id="password"
                        name="senha"
                        label="Senha"
                        type="password"
                        required={true}
                        onChange={handleChange}
                        value={values.senha}
                        variant="outlined"
                        className="user-login__form-control" />
                </div>
                <div className="user-login__form-control">
                    <TextField
                        id="password"
                        name="senhaConfere"
                        label="Confirme a Senha"
                        type="password"
                        required={true}
                        onChange={handleChange}
                        value={values.senhaConfere}
                        variant="outlined"
                        className="user-login__form-control" />
                </div>                   
                <button className="user-login__submit-button" onClick={onSubmit}>Confirmar</button>
                </form>
            </div>
            <Loader />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{mensagem.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {mensagem.text}
                    </DialogContentText>
                </DialogContent>
                {(mensagem.title == "Sucesso!") ?     
            <Button onClick={() => { handleClose(); history.push("/login"); }}>Ok</Button>
             : <Button onClick={handleClose}>Ok</Button>} 

            </Dialog>
        </div>
        </> 

             
    )
}

export default CriarSenha;