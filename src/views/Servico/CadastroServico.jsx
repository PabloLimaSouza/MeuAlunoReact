import React, { useContext, useState, useEffect } from "react";
import { Formik, Field, Form, useFormik, FieldArray } from "formik";
import { useFetch } from "../../hooks/useFetch";
import StoreContext from "../../contexts/StoreContext";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import { purple } from "@material-ui/core/colors";

function CadastroServico() {
  const { token } = useContext(StoreContext);
  const aulasUrl = "https://localhost:44389/api/aulaPorEmpresa/" + token.empresaId + "";
  const aulasResponse = useFetch(aulasUrl);

  const editarServicoId = window.location.pathname.split("/");
  var editarServicoUrl = "";

  if (editarServicoId[2] != null) {
    editarServicoUrl = `https://localhost:44389/api/servico/${editarServicoId[2]}`;
  }

  const servicoResponse = useFetch(editarServicoUrl);
  const [loading, setLoading] = useState(true);

  const initialValues = {
    Id: 0,
    Descricao: "",
    Valor: "",
    Fidelidade: false,
    TipoMulta: "",
    ValorMulta: "",
    EmpresaId: "1002",
    QtdAulas: "",
    ServicosAulas: [],
  };

  const [values, setValues] = useState(initialValues);

  useEffect(
    function () {
      if (servicoResponse.data != null) {
        var servicos = [];
        servicoResponse.data.servicosAulas.map((servico) =>
          servicos.push({ AulaId: servico.aulaId })
        );

        setValues((prevState) => ({
          Id: servicoResponse.data.id,
          Descricao: servicoResponse.data.descricao,
          Valor: servicoResponse.data.valor,
          TipoMulta: servicoResponse.data.tipoMulta,
          Fidelidade: servicoResponse.data.fidelidade,
          EmpresaId: servicoResponse.data.empresaId,
          ValorMulta: servicoResponse.data.valorMulta,
          ServicosAulas: servicos,
          QtdAulas: servicoResponse.data.qtdAulas,
        }));
      }

      console.log(values);
    },
    [servicoResponse]
  );

  useEffect(
    function () {
      if (values.QtdAulas > 0) {
        const ServicosAulas = [...values.ServicosAulas];
        const QtdAulas = values.QtdAulas || 0;
        const previousNumber = ServicosAulas.length || 0;
        if (previousNumber < QtdAulas) {
          for (let i = previousNumber; i < QtdAulas; i++) {
            ServicosAulas.push({ AulaId: "" });
          }
        } else {
          for (let i = previousNumber; i >= QtdAulas; i--) {
            ServicosAulas.splice(i, 1);
          }
        }
        setValues({ ...values, ServicosAulas });
      }
    },
    [values.QtdAulas]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: e.target.value });
    console.log(
      "handleChange " +
        ">>name: " +
        e.target.name +
        " >>value: " +
        e.target.value +
        " >>checked: " +
        e.target.checked
    );
  };

  const handleCheckChange = (e) => {
    const {name, checked} = e.target;
    setValues({...values, [name]: e.target.checked});
    console.log(
      "handleCheckChange " +
        ">>name: " +
        e.target.name +
        " >>value: " +
        e.target.value +
        " >>checked: " +
        e.target.checked
    );
  };

  const handleChangeAula = (e) => {
    const { name, value, index, select } = e.target;
    console.log(
      "handleChange " +
        ">>name: " +
        e.target.name +
        " >>value: " +
        e.target.value +
        " >>index: " +
        e.target.index
    );

    const AulaIdIndex = name.substring(13, 14);
    console.log(AulaIdIndex);
    console.log(value);

    var ServicosAulas = [...values.ServicosAulas]; //servicos que tem atualmente
    ServicosAulas.splice(AulaIdIndex, 1, { AulaId: value }); //preencher item selecionado

    setValues({ ...values, ServicosAulas });
    console.log(ServicosAulas);
  };

  function handleSubmit(e) {
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(values, null, 4));
    console.log(values);
    e.preventDefault();

    const response = fetch("https://localhost:44389/api/servico", {
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
          response == "Serviço cadastrado" ||
          response == "Serviço atualizado"
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
          <form onSubmit={handleSubmit}>
            <div className={classes.titulo}>
              <h1>Cadastro de Serviço</h1>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={classes.subtitulo}>
                  <h4>Dados do Serviço</h4>
                  <Divider />
                </div>
              </Grid>

              <Grid item xs={12} sm={10}>
                <TextField
                  id="Descricao"
                  name="Descricao"
                  label="Descricao"
                  value={values.Descricao}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Valor"
                  name="Valor"
                  label="Valor"
                  type="number"
                  fullWidth
                  value={values.Valor}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormLabel>Fidelidade</FormLabel>

                <Switch
                  color="primary"
                  name="Fidelidade"
                  value={values.Fidelidade}
                  checked={values.Fidelidade}
                  onChange={handleCheckChange}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  id="TipoMulta"
                  name="TipoMulta"
                  label="Tipo de Multa"
                  fullWidth
                  value={values.TipoMulta}
                  onChange={handleChange}
                  select
                >
                  <MenuItem value="1">Percentual</MenuItem>
                  <MenuItem value="2">Fixo</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  id="ValorMulta"
                  name="ValorMulta"
                  label="Valor Multa"
                  value={values.ValorMulta}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  id="QtdAulas"
                  name="QtdAulas"
                  label="Qtd. Aulas"
                  fullWidth
                  select
                  value={values.QtdAulas}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <MenuItem value={i}>{i}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={classes.subtitulo}>
                  <h4>Aulas do Serviço</h4>
                  <Divider />
                </div>
              </Grid>

              {values.ServicosAulas.map((ServicosAula, j) => (
                <Grid item xs={12} sm={3}>
                  <FormControl className={classes.formControl}>
                    <div>
                      <h5 className="card-title">Aula {j + 1}</h5>
                      <Select
                        onChange={handleChangeAula}
                        name={`ServicosAulas${[j]}.AulaId`}
                        value={values.ServicosAulas[j].AulaId}
                      >
                        {aulasResponse.data.map((aula, i) => (
                          <MenuItem
                            key={i}                            
                            value={aula.id}
                          >
                            {aula.dia +
                              " (" +
                              aula.horaInicio +
                              "-" +
                              aula.horaFim +
                              ")"}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </FormControl>
                </Grid>
              ))}
            </Grid>

            <div className={classes.buttons}>
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

export default CadastroServico;
