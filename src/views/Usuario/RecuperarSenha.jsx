import React, {useState} from "react";
import Loader from "../../utils/loader";
import { url } from "../../../src/variaveis";
import { Button, DialogTitle, DialogContent, DialogContentText, Dialog } from "@material-ui/core";
import { useHistory } from "react-router";


const RecuperarSenha = () => {

    const initialValues = {
        email: ""
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
        if (values.email == "") {
            setMensagem({ ...values, title: "Alerta!", text: "Informe seu e-mail" });
            setOpen(true);            
        } else {
            document.getElementById("div-loading").style.display = "block";
            const body = {
                UsuarioEmail: values.email,
                
            }
            const response = fetch(`${url}/api/v1/login/forgotpassword`, {
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
            <div className="wrapper">
            <div className="user-login">
                <h1 className="user-login__title">Recuperar Senha</h1>
                <form>
                    <div className="user-login__form-control">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
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

export default RecuperarSenha;