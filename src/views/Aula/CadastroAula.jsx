import React, { useContext, useState, useEffect } from 'react'
import useStyles from "../Styles/useStyles";
import { Button, 
  Grid,
  Paper,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Tooltip, } from "@material-ui/core";
import StoreContext from "../../contexts/StoreContext";
import { useFetch } from '../../hooks/useFetch';
import { useHistory } from "react-router";
import { horarioMask, onlyNumbersMax5 } from '../../utils/mask';
import { url } from "../../../src/variaveis";
import Loader from "../../utils/loader";

function CadastroAula(){
    const { token, userLogged } = useContext(StoreContext);      
    const history = useHistory();
    const [open, setOpen] = useState(false);
    //montar URL para editar aula
    var editando = false;
    var editarAulaUrl = "";    
    const editarAulaId = window.location.pathname.split("/");
    if (editarAulaId[2] != null){
      editarAulaUrl =  `${ url }/api/aula/${editarAulaId[2]}`;
      editando = true;      
    }

    const aulaResponse = useFetch(editarAulaUrl,"get",token);
    const [loading, setLoading] = useState(true);  

    const initialValues = {
      Id: 0,
      Dia: "",
      HoraInicio: "",
      HoraFim: "",
      Vagas: "",
      EmpresaId: userLogged.empresaId,
  }

  const alertas = {
    text: "",
    title: ""
  }

  const [mensagem, setMensagem] = useState(alertas);

  const handleClickOpen = () => {      
    if (validadorForm()) {
      handleSubmit();      
    } else {
      console.log("form inválido");
    }
  };

  const validadorForm = () => {
    if(values.Dia == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar dia da aula" });
      setOpen(true);      
    } else if(values.HoraInicio == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar horário de inicio" });
      setOpen(true);      
    } else if(values.HoraFim == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar horário de fim" });
      setOpen(true);      
    } else if(values.Vagas == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar quantidade de vagas" });
      setOpen(true);      
    } else {
      return true;
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

    useEffect(
      function(){
        if (aulaResponse.data != null){
          setValues((prevState) => ({
            Id:  aulaResponse.data.id,
            Dia: aulaResponse.data.dia,
            HoraInicio:  aulaResponse.data.horaInicio,
            HoraFim:  aulaResponse.data.horaFim,
            Vagas:  aulaResponse.data.vagas,
            EmpresaId: aulaResponse.data.empresaId,
          }));
        };
      },
      [aulaResponse]
    );

    const [values,setValues] = useState(initialValues);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name]: e.target.value});
    }

    function handleSubmit(e) {   
      document.getElementById("div-loading").style.display = "block";

        const response = fetch(`${ url }/api/aula`, {
        method: "POST",
        headers: {
          Authorization: 'Bearer '+token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((response) => {
          document.getElementById("div-loading").style.display = "none";

          if (response === "Aula cadastrada" || response === "Aula atualizada") {
            setMensagem({ ...values, title: "Sucesso!", text: response })
            setOpen(true);
           } 
          else {
            setMensagem({ ...values, title: "Erro!", text: "Erro ao cadastrar aula" })
            setOpen(true);
          }
        });
    }

    const classes = useStyles();

    return (
        <React.Fragment>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <div className={classes.titulo}>
                <h1>Cadastro de Aula</h1>
              </div>
              <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                      <Grid item xs={12} sm={3}>
                          <TextField 
                             id="Dia"
                             name="Dia"
                             label="Dia da Semana"                             
                             onChange={handleChange}
                             value={values.Dia}
                          />
                      </Grid>
                      <Grid item xs={3}>
                          <TextField 
                             id="HoraInicio"
                             name="HoraInicio"
                             label="Hora Inicio"                             
                             onChange={(e) => {handleChange(horarioMask(e))}}
                             value={values.HoraInicio}
                          />
                      </Grid>
                      <Grid item xs={3}>
                          <TextField 
                             id="HoraFim"
                             name="HoraFim"
                             label="Hora Fim"                             
                             onChange={(e) => {handleChange(horarioMask(e))}}
                             value={values.HoraFim}
                          />
                      </Grid>
                      <Grid item xs={3}>
                          <TextField 
                             id="Vagas"
                             name="Vagas"
                             label="Qtd. Vagas"                             
                             onChange={(e) => {handleChange(onlyNumbersMax5(e))}}
                             value={values.Vagas}
                          />
                      </Grid>
                  </Grid>
                  <div className={classes.buttons}>
              {editando
              ? false
              : <Button
              variant="contained"
              color="inherit"
              className={classes.button}
            >
              Limpar
            </Button>}
             
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                className={classes.button}
              >
                {editando ? "Atualizar" : "Cadastrar"}
              </Button>
            </div>
              </form>
            </Paper>
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

          {(mensagem.text == "Aula cadastrada" || mensagem.text == "Aula atualizada") ?     
            <Button onClick={() => { handleClose(); history.push("/aulas"); }}>Ok</Button>
             : <Button onClick={handleClose}>Ok</Button>} 
          
        </Dialog>
          </main>
          <Loader/>
        </React.Fragment>
      );

}

export default CadastroAula;