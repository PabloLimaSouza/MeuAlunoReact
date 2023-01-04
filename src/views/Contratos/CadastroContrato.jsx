import {
    Grid, TextField, TextareaAutosize, FormControlLabel, Checkbox, Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Dialog
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../../contexts/StoreContext";
import useStyles from "../Styles/useStyles";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { url } from "../../variaveis";
import "./Contratos.css";


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
                        ContratoId: retornoContrato.data.contratoId,
                        Ativa: clausula.ativa,
                        Ordem: clausula.ordem
                    })
                )))
                setClausulas(clausulasExistentes);
            }
        }, [retornoContrato]
    );


    const handleClose = () => {
        setOpen(false);
    };

    const handleClausula = (e, i) => {
        debugger;
        const { checked } = e.target;
        var clausulasExistentes = [...clausulas];
        if (checked === false) {
            clausulasExistentes[i].Ativa = false;
            setClausulas(clausulasExistentes);
        }
        else if (checked === true) {
            clausulasExistentes[i].Ativa = true;
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


    function addClausula() {
        var clausulasExistentes = [...clausulas];
        clausulasExistentes.push({
            Nome: "",
            Descricao: "",
            ContratoId: contrato == null ? 0 : contrato.ContratoId,
            Ativa: false
        });
        setClausulas(clausulasExistentes);
    };

    const handleChange = (e, i) => {
        const { name, value } = e.target;
        var clausulasExistentes = [...clausulas];        
        clausulasExistentes[i][name] = value;            
        setClausulas(clausulasExistentes);
    };

    function handleSubmit(e) {
        var ContratoId = contrato == null ? 0 : contrato.ContratoId;
        var EmpresaId = userLogged.empresaId;
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

    const onDragEnd = () => {

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
                     
                            
                                       {clausulas.map((clausula, i) => (     
                                        
                                        
                                        <div className="clausula-list" id={clausula.id}>
                                          
                                              
                                                    <Grid item xs={12} sm={1}>
                                                            <FormControlLabel
                                                                control={<Checkbox
                                                                    key={clausula.Id}
                                                                    name={clausula.Id}
                                                                    value={clausula.Id}
                                                                    onChange={(e) => handleClausula(e, i)}
                                                                    checked={checkChange(clausula.Id, i)}
                                                                    width={"20px"} />} />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <TextField
                                                                key={clausula.Id}
                                                                value={clausula.Ordem}
                                                                label={"Ordem"}
                                                                name={"Ordem"}
                                                                onChange={(e) => handleChange(e, i)}
                                                                variant="outlined"
                                                                style={{ width: 70 }}/>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <TextField
                                                                key={clausula.Id}
                                                                value={clausula.Nome}
                                                                label={"Nome"}
                                                                name={"Nome"}
                                                                onChange={(e) => handleChange(e, i)}
                                                                variant="outlined"
                                                                style={{ width: 300 }} />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextareaAutosize
                                                                label={"Descrição"}
                                                                name={"Descricao"}
                                                                value={clausula.Descricao}
                                                                key={clausula.Id}
                                                                onChange={(e) => handleChange(e, i)}
                                                                style={{ width: 600, height: 100 }} />
                                                        </Grid>    
                                        </div>
                                    ))}
                        

                    </Grid>
                    <div className={classes.button}>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={addClausula}
                            className={classes.button}
                        >
                            Adicionar
                        </Button>
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