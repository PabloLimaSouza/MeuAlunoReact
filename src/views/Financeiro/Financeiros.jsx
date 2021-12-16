import React, { useState, useEffect, useContext } from "react";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, TextField } from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import StoreContext from "../../contexts/StoreContext";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import "./Financeiros.css";
import CurrencyFormat from 'react-currency-format';
import { onlyLetters, currencyMask, currencyMaskList } from "../../utils/mask";

const Financeiros = () => {
  const { token } = useContext(StoreContext);
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);



  const url = `https://localhost:44389/api/financeiroPorEmpresa/${token.empresaId}`;
  const response = useFetch(url);
  const [listaFinanceiros, setListaFinanceiros] = useState("");

  useEffect(() => {
    setListaFinanceiros(response.data);
  }, [response])

  var CurrencyFormat = require('react-currency-format');

  const initialValues = {
    Id: 0,
    AlunoId: 0,
    NomeAluno: "",
    DataVencimento: "",
    Valor: 0,
    FormaPagamento: "",
    Situacao: 0,
    EmpresaId: 0,
  }
  const [values, setValues] = useState(initialValues);

  const filtros = {
    VencimentoInicio: "",
    VencimentoFim: "",
    Pessoa: "",
    Tipo: "",
    Situacao: "",
    EmpresaId: token.empresaId
  }

  const alertas = {
    text: "",
    title: ""
  }

  const [mensagem, setMensagem] = useState(alertas);

  const handleClickOpen = () => {
    if (validadorForm()) {
      handlePesquisar();
    }
  };

  const validadorForm = () => {
    if (filtroValues.VencimentoInicio == "" && filtroValues.VencimentoFim == "" && filtroValues.Pessoa == ""
      && filtroValues.Tipo == "" && filtroValues.Situacao == "") {
      setMensagem({ ...values, title: "Erro!", text: "Informe algum filtro para pesquisar" })
      setOpen(true);
    }
    return true;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [filtroValues, setFiltroValues] = useState(filtros);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltroValues({ ...filtroValues, [name]: value });
  }

  const show = () => {
    console.log(listaFinanceiros);
  }

  function handlePesquisar(e) {
    const response = fetch("https://localhost:44389/api/financeiro/buscar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtroValues),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response != null) {
          setListaFinanceiros(response);
        } else {
          setMensagem({ ...values, title: "Erro!", text: "Nenhum documento encontrado com o filtro utilizado" });
          setOpen(true);
        }
      })
  }

  function editarFinanceiro(id) {
    history.push(`/cadastroFinanceiro/${id}`)
  }

  function novoFinanceiro() {
    history.push("/cadastroFinanceiro")
  }

  function showFinanceiros(financeiros) {
    if (financeiros != null) {
      return (
        console.log(financeiros),
        financeiros.map((financeiro) => (
          <tr onClick={() => editarFinanceiro(financeiro.id)}>

            <td key={financeiro.id}>{financeiro.id}</td>
            <td key="tipo">{financeiro.tipo === 1 ? "Receber" : "Pagar"}</td>
            <td key="pessoaNome">{financeiro.pessoaNome}</td>
            <td key="formaPagamento">{financeiro.formaPagamento}</td>
            <td key="dataVencimento">{format(new Date(financeiro.dataVencimento), 'dd/MM/yyy')}</td>
            <td key="valor">{currencyMaskList(parseFloat(financeiro.valor).toFixed(2))}</td>
            <td key="situacao">{financeiro.situacao == 1 ? "Em aberto" : "Liquidado"}</td>
          </tr>
        ))
      )
    }
    return false
  }

  return (

    <div className="lista-financeiros">
      <h1>Financeiro</h1>

      <div className="btn-novo">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={novoFinanceiro}
          className="btn-novo"
        >
          Novo
        </Button>
      </div>
      <div className="filtro-financeiros">
        <Grid container>
          <Grid item xs={12} sm={2}>
            <TextField
              id="VencimentoInicio"
              name="VencimentoInicio"
              type="date"
              label="Vencimento Inicio"
              value={filtroValues.VencimentoInicio}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="VencimentoFim"
              name="VencimentoFim"
              type="date"
              label="Vencimento Fim"
              value={filtroValues.VencimentoFim}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="Pessoa"
              name="Pessoa"
              label="Pessoa"
              value={filtroValues.Pessoa}
              onChange={(e) => (handleChange(onlyLetters(e)))}
              InputLabelProps={{
                shrink: true,
              }}
            >
            </TextField>
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              id="Tipo"
              name="Tipo"
              label="Tipo"
              select
              value={filtroValues.Tipo}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value="1">CRE</MenuItem>
              <MenuItem value="2">CPA</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="Situacao"
              name="Situacao"
              label="Situação"
              select
              fullWidth
              value={filtroValues.Situacao}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value="0">Todos</MenuItem>
              <MenuItem value="1">Abertos</MenuItem>
              <MenuItem value="2">Fechados</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button
              variant="contained"
              color="secondary"
              className="btn-pesquisar"
              disableElevation={true}
              size="small"
              onClick={handleClickOpen}
            >
              Pesquisar
            </Button>
          </Grid>
        </Grid>
      </div>

      <table id="financeiros">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Tipo</th>
            <th>Pessoa</th>
            <th>FOP</th>
            <th>Vencimento</th>
            <th>Valor</th>
            <th>Situação</th>
          </tr>
          {listaFinanceiros ?
            showFinanceiros(listaFinanceiros)
            : false}
        </tbody>
      </table>

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
        <Button onClick={handleClose}>Ok</Button>
      </Dialog>
    </div>
  );
}

export default Financeiros;
