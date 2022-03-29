import { Button, Grid, Paper, TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,  
  Dialog,
  } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import StoreContext from "../../contexts/StoreContext";
import useStyles from "../Styles/useStyles";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";

function CadastroMateria() {
  const { token, userLogged } = useContext(StoreContext);  
  const [open, setOpen] = useState(false);
  const history = useHistory();
      //montar URL para editar matéria
      var editando = false;
      var editarMateriaUrl = "";    
      const editarMateriaId = window.location.pathname.split("/");
      if (editarMateriaId[2] != null){
        editarMateriaUrl =  `http://raphaelfogaca-002-site1.itempurl.com/api/materia/${editarMateriaId[2]}`;  
        editando = true;    
      }
  
      const materiaResponse = useFetch(editarMateriaUrl,"get",token);
      const [loading, setLoading] = useState(true);  

  const initialValues = {
    Id: 0,
    Nome: "",
    EmpresaId: userLogged.empresaId,
  };

  const [values, setValues] = useState(initialValues);

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
    if(values.Nome == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar nome da matéria" });
      setOpen(true);      
    } else {
      return true;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(
    function(){
      if (materiaResponse.data != null){
        setValues((prevState) => ({
          Id:  materiaResponse.data.id,
          Nome: materiaResponse.data.nome,
          EmpresaId: materiaResponse.data.empresaId,
        }));
      };
    },
    [materiaResponse]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: e.target.value });
  };

  function handleSubmit(e) {
    alert("Sucess: \n\n" + JSON.stringify(values, null, 4));
    console.log(values);    

    const response = fetch("http://raphaelfogaca-002-site1.itempurl.com/api/materia/", {
      Authorization: 'Bearer '+token,    
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response === "Matéria cadastrada" || response === "Matéria atualizada") {
          setMensagem({ ...values, title: "Sucesso!", text: response })
          setOpen(true);
         } 
        else {
          setMensagem({ ...values, title: "Erro!", text: "Erro ao cadastrar matéria" })
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
            <h1>Cadastro de Matéria</h1>
          </div>
          <form >
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <TextField 
                         id="Nome"
                         name="Nome"
                         label="Nome"
                         fullWidth
                         onChange={handleChange}
                         value={values.Nome}
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

          {(mensagem.text == "Matéria cadastrada" || mensagem.text == "Matéria atualizada") ?     
            <Button onClick={() => { handleClose(); history.push("/materias"); }}>Ok</Button>
             : <Button onClick={handleClose}>Ok</Button>} 
          
        </Dialog>
      </main>
    </React.Fragment>
  );
}

export default CadastroMateria;
