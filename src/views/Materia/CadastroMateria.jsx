import { Button, Grid, Paper, TextField } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import StoreContext from "../../contexts/StoreContext";
import useStyles from "../Styles/useStyles";
import { useFetch } from "../../hooks/useFetch";
import { useHistory, Route } from "react-router-dom";

function CadastroMateria() {
  const { token } = useContext(StoreContext);
  const { history } = useHistory();
      //montar URL para editar matéria
      var editarMateriaUrl = "";    
      const editarMateriaId = window.location.pathname.split("/");
      if (editarMateriaId[2] != null){
        editarMateriaUrl =  `https://localhost:44389/api/materia/${editarMateriaId[2]}`;      
      }

  function listaMaterias(){
      history.push("/materias");
  }
  
      const materiaResponse = useFetch(editarMateriaUrl);
      const [loading, setLoading] = useState(true);  

  const initialValues = {
    Id: 0,
    Nome: "",
    EmpresaId: token.empresaId,
  };

  const [values, setValues] = useState(initialValues);

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
    e.preventDefault();

    const response = fetch("https://localhost:44389/api/materia/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (
          response == "Matéria atualizada" ||
          response == "Matéria cadastrada"
        ) {
         window.alert('Sucesso!');      
        } else {
          window.alert('Erro!');
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
          <form onSubmit={handleSubmit}>
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
              <div classname={classes.buttons}>
              <Button
                variant="contained"
                color="inherit"
                className={classes.button}
              >
                Limpar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Cadastrar
              </Button>
            </div>
          </form>        
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default CadastroMateria;
