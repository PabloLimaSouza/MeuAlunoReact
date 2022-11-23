import { Grid, Paper, TextareaAutosize, FormControlLabel, Checkbox, Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Dialog } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../../contexts/StoreContext";
import useStyles from "../Styles/useStyles";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { url } from "../../variaveis";


function CadastroContrato() {

    const classes = useStyles();
    const { token, userLogged } = useContext(StoreContext);
    const retornoContrato = useFetch(`${url}/api/v1/contratos/empresa/${userLogged.empresaId}`, "get", token)
    const [clausulas, setClausulas] = useState([])
    const [contrato, setContrato] = useState();
    const alertas = {
        text: "",
        title: ""
      }
    
    const [mensagem, setMensagem] = useState(alertas);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    
    const checkAdmin = () => {
        if(userLogged.tipoUsuario == 1){
            return true;
        }else{
            return false;
        }
    };

    useEffect(
        function () {
            if (retornoContrato.data != null) {
                const contratoValues = {
                    ContratoId: retornoContrato.data.contratoId,
                    EmpresaId: userLogged.empresaId
                }
                setContrato(contratoValues);
                var clausulasExistentes = []                
                retornoContrato.data.clausulas.map((clausula => (
                    clausulasExistentes.push({ 
                        Id: clausula.id,
                        Nome: clausula.nome,
                        Descricao: clausula.descricao,
                        ContratoId: clausula.ContratoId,
                        Ativa: clausula.ativa
                    })
                )))
                setClausulas(clausulasExistentes);
            }
        }, [retornoContrato]
    );

    useEffect(
        function() {
console.log("clausula", clausulas);
        },[clausulas]
    )

    const handleClose = () => {
        setOpen(false);
      };

      const handleClausula = (e) => {
        const { name, value, checked } = e.target;
        var clausulasExistentes = [...clausulas];  
        var clausulaIndex = clausulas.findIndex(i => i.Id == name);
        if (checked === false) {
            clausulasExistentes[clausulaIndex].Ativa = false;
            setClausulas(clausulasExistentes);
        }
        else if (checked === true) {
            clausulasExistentes[clausulaIndex].Ativa = true;
            setClausulas(clausulasExistentes);
        }
    };  

    function checkChange(id) {
        var checkClausulas = clausulas;
        var clausulasId = []
        checkClausulas.map((clausula, i) => (
            clausula.Ativa == true ? clausulasId.push(clausula.Id) : false                        
        ))
        if (clausulasId.find(e => e == id)) {
            return true
        } else
            return false
    }
   

    function addClausula(){        
        var clausulasExistentes = [...clausulas];                
        clausulasExistentes.push({ 
                        Id: 1,
                        Nome: "Nova cláusula",
                        Descricao: "descrição",
                        ContratoId: 0,
                        Ativa: false
                    });                                   
        setClausulas(clausulasExistentes);   
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        var clausulasExistentes = clausulas;
        var clausulaIndex = clausulas.findIndex(i => i.Id == name);
        clausulasExistentes[clausulaIndex].descricao = value;
        setClausulas(clausulasExistentes);
      };

    function handleSubmit(e) {  
        var ContratoId = contrato.ContratoId;
        var EmpresaId = contrato.EmpresaId;
        var request = {            
            clausulas,
            ContratoId,
            EmpresaId
        }

        const response = fetch(`${url}/api/v1/contratos/`, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        })
        .then((response) => {     
              setMensagem({ title: "Sucesso!", text: "Contrato atualizado." })
              setOpen(true);         
          })
         .catch((response) => {
             setMensagem({ title: "Erro!", text: "Erro ao atualizar cadastro." })
             setOpen(true);
          });

    }

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <div className={classes.stepper}>
                            <h2>Selecione quais cláusulas deseja adicionar no contrato:</h2>
                        </div>
                    </Grid>
                </Grid>
                
                <form>
                    <Grid container spacing={3}>                       
                   {clausulas.map((clausula,i) => (
                       
                       <>
                      <Grid item xs={12} sm={2}>
                      <FormControlLabel
                          control={
                              <Checkbox
                                  key={clausula.Id}
                                  name={clausula.Id}
                                  value={clausula.Id}
                                  onChange={handleClausula}
                                  checked={checkChange(clausula.Id)}
                              />
                          }
                      />
                      </Grid>
                      <Grid item xs={12} sm={10}>
                                            <TextareaAutosize
                                                key={clausula.Id}
                                                minRows={4}
                                                aria-label="maximum height"
                                                placeholder="Maximum 4 rows"
                                                defaultValue={clausula.Nome + " " + clausula.Descricao}
                                                disabled={checkAdmin() === true ? false : true}
                                                name={clausula.Id}
                                                style={{ width: 700 }}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                      </>
                  
                   ))}

                    </Grid>
                    <div className={classes.button}>

                    {checkAdmin() === true ? 
                        <Button
                        variant="contained"
                        color="warning"                            
                        onClick={addClausula}
                        className={classes.button}
                    >
                        Adicionar
                    </Button>

                        : false}

                        <Button
                            variant="contained"
                            color="primary"                            
                            onClick={handleSubmit}
                            className={classes.button}
                        >
                            Salvar
                        </Button>
                        
                        
                    </div>
                </form>

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
          {<Button onClick={() => { handleClose(); history.push("/contratos"); }}>Ok</Button>}
        </Dialog>
            </main>
        </React.Fragment>
    )
}

export default CadastroContrato;