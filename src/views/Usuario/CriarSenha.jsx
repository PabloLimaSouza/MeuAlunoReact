import React, {useState} from "react";
import Loader from "../../utils/loader";
import { url } from "../../../src/variaveis";
import { Button, DialogTitle, DialogContent, DialogContentText, Dialog } from "@material-ui/core";
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
        event.preventDefault();
        if (values.senha != values.senhaConfere) {
            setMensagem({ ...values, title: "Alerta!", text: "As senhas informadas devem ser iguais" });
            setOpen(true);            
        } else {
            document.getElementById("div-loading").style.display = "block";
            var userData = window.location.href.split('%5B$');
            const body = {
                UsuarioEmail: userData[1],
                ResetToken : userData[2],       
                NewPassword: values.senha,   
            }
            const response = fetch(`${url}/api/usuario/resetPassword`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            })
            .then((response) => response.json())
            .then((response) => {
              document.getElementById("div-loading").style.display = "none";
                debugger;
              if (response.error) {          
                setMensagem({ ...values, title: "Erro!", text: response.message })
                setOpen(true);
               } 
              else {              
                setMensagem({ ...values, title: "Sucesso!", text: response.message })
                setOpen(true);

              }        
            });
        }
     };

    return (
        
            <>
            <div className="wrapper">
            <div className="user-login">
                <h1 className="user-login__title">Criar nova senha</h1>
                <form>
                    <div className="user-login__form-control">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            name="senha"
                            onChange={handleChange}
                            value={values.senha}
                            required />
                    </div>
                    <div className="user-login__form-control">
                        <label htmlFor="password">Repetir Senha</label>
                        <input
                            id="password"
                            type="password"
                            name="senhaConfere"
                            onChange={handleChange}
                            value={values.senhaConfere}
                            required />
                    </div>
                    <button onClick={onSubmit}>Confirmar</button>
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