import React, { useContext, useState, useEffect, Component } from "react";
import { Formik, Field, Form, useFormik, FieldArray } from "formik";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router";
import StoreContext from "../../contexts/StoreContext";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import lifecycle, { componentDidMount, componentDidUpdate } from 'react-pure-lifecycle';
import Loader from "../../utils/loader";

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
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Tooltip,
} from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import { purple } from "@material-ui/core/colors";
import { currencyMask, onlyLetters, currencyMaskList } from "../../utils/mask";
import { url } from "../../../src/variaveis";

function CadastroServico() {
  const { token, userLogged } = useContext(StoreContext);
  const aulasResponse = useFetch(`${ url }/api/v1/aulas/empresa/${userLogged.empresaId}`,"get",token);
  const history = useHistory();
  const editarServicoId = window.location.pathname.split("/");
  var editarServicoUrl = "";

  if (editarServicoId[2] != null) {
    editarServicoUrl = `${ url }/api/v1/servicos/${editarServicoId[2]}`;
  }

  const servicoResponse = useFetch(editarServicoUrl,"get",token);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    Id: 0,
    Descricao: "",
    Valor: "",
    Fidelidade: false,
    TipoMulta: 0,
    ValorMulta: "",
    EmpresaId: userLogged.empresaId,
    QtdAulas: "",
    ServicosAulas: [],
  };

  const [values, setValues] = useState(initialValues);
  const alertas = {
    text: "",
    title: ""
  }
  const [mensagem, setMensagem] = useState(alertas);
  const [open, setOpen] = useState(false);

  const validadorServicosAulas = () => {
    var validador = false;    
    for (var i = 0; i < values.QtdAulas; i++) {      
      if (values.ServicosAulas[i] != null && values.ServicosAulas[i].AulaId == "") {
        validador = false;
      }
      else {
        validador = true;
      }
    }    return validador;
  }

  const validadorForm = () => {
    if (values.Descricao == "") {
      setMensagem({ ...values, title: "Alerta!", text: "Necessário selecionar uma descrição" });
      setOpen(true);
    } else if (values.Valor == "") {
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar valor" });
      setOpen(true);
    } else if (values.QtdAulas == "") {
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar quantidade de aulas" });
      setOpen(true);
    } else if (values.ServicosAulas[0].AulaId == "") {
      setMensagem({ ...values, title: "Alerta!", text: "Necessário selecionar pelo menos uma aula" });
      setOpen(true);
    } else if (values.QtdAulas > 0 && !validadorServicosAulas()) {
      for (var i = 0; i <= values.QtdAulas; i++) {
        if (values.ServicosAulas[i] != null && values.ServicosAulas[i].AulaId == "") {
          setMensagem({ ...values, title: "Alerta!", text: "Falta selecionar aula do serviço" });
          setOpen(true);
        }
      }  
    } else if (values.Fidelidade == true && (values.TipoMulta == "" || values.ValorMulta == "")){
        if(values.TipoMulta == ""){
          setMensagem({ ...values, title: "Alerta!", text: "Necessário informar tipo de multa quando tem fidelidade" });
          setOpen(true);
        }
        if(values.ValorMulta == ""){
          setMensagem({ ...values, title: "Alerta!", text: "Necessário informar valor de multa quando tem fidelidade" });
          setOpen(true);
        } 
    }  else {
      return true;
    }
  }

  const handleClickOpen = () => {
    if (validadorForm())  {        
        handleSubmit();
      }
      else {
        console.log("form invalido");
      }      
    }     
       
  
  const methods = {
    componentDidUpdate(isFormValid) {
      return true;
    }
  };

const handleClose = () => {
  setOpen(false);
};

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
        Valor: currencyMaskList(parseFloat(servicoResponse.data.valor).toFixed(2)),
        TipoMulta: servicoResponse.data.tipoMulta,
        Fidelidade: servicoResponse.data.fidelidade,
        EmpresaId: servicoResponse.data.empresaId,
        ValorMulta: servicoResponse.data.valorMulta,
        ServicosAulas: servicos,
        QtdAulas: servicoResponse.data.qtdAulas,
      }));
    }
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
  var { name, value } = e.target;  
  setValues({ ...values, [name]: value });
};

const handleCheckChange = (e) => {
  const { name, checked } = e.target;
  setValues({ ...values, [name]: e.target.checked });
};

const handleChangeAula = (e) => {
  const { name, value, index, select } = e.target;
  const AulaIdIndex = name.substring(13, 14);
  var ServicosAulas = [...values.ServicosAulas]; //servicos que tem atualmente
  ServicosAulas.splice(AulaIdIndex, 1, { AulaId: value }); //preencher item selecionado
  setValues({ ...values, ServicosAulas });
};


const tratarDecimal = (e) => {
  if(e == 0)
  return 0
  else
  return e.replace(".","").replace(",",".");
}

function handleSubmit(e) {
  setLoading(true);
  var dados = values;
  dados.Valor = tratarDecimal(values.Valor);
  dados.ValorMulta = tratarDecimal(values.ValorMulta);
  document.getElementById("div-loading").style.display = "block";

  const response = fetch(`${ url }/api/v1/servicos`, {
    method: "POST",
    headers: {
      Authorization: 'Bearer  '+token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
  .then( async (response) => {
    if(response.ok){
      let data = await response.json();
      setMensagem({ ...values, title: "Sucesso!", text: data })
      setOpen(true);
    }else{
      let data = await response.json();
      setMensagem({ ...values, title: "Erro!", text: data })
      setOpen(true);
    }
  })
  .catch((err) => {
      console.log(err);
  })
  document.getElementById("div-loading").style.display = "none";   
}

const classes = useStyles();

return (
  <React.Fragment>
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <form>
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
                label="Descrição"
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
                fullWidth
                value={values.Valor}
                onChange={(e) => handleChange(currencyMask(e))}
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
              { values.Fidelidade ? 
              (
                <> 
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
                 onChange={(e) => handleChange(currencyMask(e))}
                 fullWidth
               />
             </Grid> 
             </>             
              )
            : false }
          

           

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
              onClick={handleClickOpen}
              className={classes.button}
              disabled={loading}
            >
              Cadastrar
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
        {(mensagem.text == "Serviço cadastrado" || mensagem.text == "Serviço atualizado") ?
          <Button onClick={() => { handleClose(); history.push("/servicos"); }}>Ok</Button>
          : <Button onClick={handleClose}>Ok</Button>}

      </Dialog>
    </main>
    <Loader/>
  </React.Fragment>
);
                          }
export default CadastroServico;
