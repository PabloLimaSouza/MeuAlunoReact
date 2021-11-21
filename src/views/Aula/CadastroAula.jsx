import React, { useContext, useState, useEffect } from 'react'
import useStyles from "../Styles/useStyles";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import StoreContext from "../../contexts/StoreContext";
import { useFetch } from '../../hooks/useFetch';

function CadastroAula(){
    const { token } = useContext(StoreContext);
    const url = "https://localhost:44389/api/aula/";  
    
    //montar URL para editar aula
    var editarAulaUrl = "";    
    const editarAulaId = window.location.pathname.split("/");
    if (editarAulaId[2] != null){
      editarAulaUrl =  `https://localhost:44389/api/aula/${editarAulaId[2]}`;      
    }

    const aulaResponse = useFetch(editarAulaUrl);
    const [loading, setLoading] = useState(true);  

    const initialValues = {
      Id: 0,
      Dia: "",
      HoraInicio: "",
      HoraFim: "",
      Vagas: "",
      EmpresaId: token.empresaId,
  }

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
        alert("Sucess: \n\n" + JSON.stringify(values, null, 4));
        console.log(values);
        e.preventDefault();

        const response = fetch("https://localhost:44389/api/aula", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((response) => {
          if (
            response == "Aula cadastrada" ||
            response == "Aula atualizada"
          ) {
            console.log("Deu bom");
            console.log(response);
          } else {
            console.log("Deu ruim");
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
                             onChange={handleChange}
                             value={values.HoraInicio}
                          />
                      </Grid>
                      <Grid item xs={3}>
                          <TextField 
                             id="HoraFim"
                             name="HoraFim"
                             label="Hora Fim"                             
                             onChange={handleChange}
                             value={values.HoraFim}
                          />
                      </Grid>
                      <Grid item xs={3}>
                          <TextField 
                             id="Vagas"
                             name="Vagas"
                             label="Qtd. Vagas"                             
                             onChange={handleChange}
                             value={values.Vagas}
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

export default CadastroAula;