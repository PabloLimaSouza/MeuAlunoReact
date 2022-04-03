import { Grid, Paper, TextareaAutosize, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../../contexts/StoreContext";
import useStyles from "../Styles/useStyles";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { url } from "../../variaveis";


function CadastroContrato() {

    const classes = useStyles();
    const { token, userLogged } = useContext(StoreContext);
    const retornoContrato = useFetch(`${url}/api/contratoPorEmpresaId/${userLogged.empresaId}`, "get", token)
    const [clausulas, setClausulas] = useState([])
    const [contrato, setContrato] = useState([]);

    useEffect(

        function () {
            if (retornoContrato.data != null) {
                const contratoValues = {
                    ContratoId: retornoContrato.data.contrato.id,
                    EmpresaId: userLogged.empresaId
                }
                setContrato(contratoValues);
            }
        }, [retornoContrato]
    );

    const handleClausula = (e) => {
        const { name, value, checked } = e.target;

        var clausula = value.split('|');
        const values = {
            Id: name,
            Nome: clausula[1],
            Descricao: clausula[2],
            ContratoId: contrato.ContratoId,
            Ativa: false,
        };
        var clausulasExistentes = [...clausulas]; //cláusulas que tem atualmente    

        //se desmarcar checkbox 
        if (checked === false) {
            //se encontrar clausulaId no array, faz filter e tira
            values.Ativa = false;
            clausulasExistentes = clausulasExistentes.filter((n) => n.Id != values.Id);
            setClausulas(clausulasExistentes);
        }

        //se marcar checkbox
        if (checked === true) {
            //adiciona materia no array
            values.Ativa = true;
            clausulasExistentes.push(values);
            setClausulas(clausulasExistentes);
        }
    };

    function checkChange(id) {
        var checkClausulas = [...clausulas]
        var clausulasId = []
        checkClausulas.map((clausula, i) => (
            clausulasId.push(clausula.Id)
        ))
        if (clausulasId.find(e => e == id)) {
            return true
        } else
            return false
    }

    function handleSubmit(e) {
        debugger;
        console.log(retornoContrato);
        debugger;
        var request = {
            clausulas,
            contrato
        }

        alert("SUCCESS!! :-)\n\n" + JSON.stringify(request, null, 4));

        const response = fetch(`${url}/api/contrato/`, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
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
                        {retornoContrato.data != null ?
                            (retornoContrato.data.clausulas.map((clausula, i) => {
                                return (
                                    <>
                                        <Grid item xs={12} sm={2}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name={clausula.id}
                                                        value={`${i}|${clausula.nome}|${clausula.descricao}`}
                                                        onChange={handleClausula}
                                                        checked={checkChange(clausula.id)}
                                                    />
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={10}>
                                            <TextareaAutosize
                                                minRows={4}
                                                aria-label="maximum height"
                                                placeholder="Maximum 4 rows"
                                                defaultValue={clausula.nome + " " + clausula.descricao}
                                                name={clausula.id}
                                                style={{ width: 700 }}
                                            />
                                        </Grid>
                                    </>
                                )
                            }))
                            : false
                        }

                    </Grid><div className="btn-novo">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleSubmit}
                            className="btn-novo"
                        >
                            Salvar
                        </Button>
                    </div>

                </form>
            </main>
        </React.Fragment>
    )
}

export default CadastroContrato;