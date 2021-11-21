import React, { useContext, useState, useEffect } from "react";
import useStyles from "../Styles/useStyles";
import {
  Button,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Switch,
  FormLabel,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Tooltip,
} from "@material-ui/core";
import StoreContext from "../../contexts/StoreContext";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router";
import et from "date-fns/esm/locale/et/index.js";
import { parseJSON } from "date-fns";
import { format } from "date-fns";
import CurrencyFormat from "react-currency-format";

function CadastroFinanceiro() {
  const classes = useStyles();
  var CurrencyFormat = require("react-currency-format");

  const urlAlunos = "https://localhost:44389/api/aluno";
  const responseAluno = useFetch(urlAlunos);
  const { token } = useContext(StoreContext);
  const [todos, setTodos] = useState(false);

  const editarFinanceiro = window.location.pathname.split("/");
  var editarFinanceiroUrl = "";
  if (editarFinanceiro[2] != null) {
    editarFinanceiroUrl = `https://localhost:44389/api/cadastroFinanceiro/${editarFinanceiro[2]}`;
  }
  const responseEditarFinanceiro = useFetch(editarFinanceiroUrl);

  const initialValues = {
    Id: 0,
    AlunoId: 0,
    AlunoNome: "",
    DataVencimento: "",
    qtdProvisionar: 0,
    Valor: 0,
    FormaPagamento: "",
    Situacao: 1,
    EmpresaId: 1002,
    todosAlunos: false,
  };

  const [values, setValues] = useState(initialValues);
  const [open, setOpen] = useState(false);

  useEffect(
    function () {
      if (todos) {
        setValues({ ...values, todosAlunos: true, qtdProvisionar: 0 });
      } else setValues({ ...values, todosAlunos: false });
    },
    [todos]
  );

  useEffect(
    function () {
      if (responseEditarFinanceiro.data != null) {
        setValues((prevState) => ({
          Id: responseEditarFinanceiro.data.id,
          AlunoId: responseEditarFinanceiro.data.alunoId,
          AlunoNome: responseEditarFinanceiro.data.nomeAluno,
          DataVencimento: format(
            new Date(responseEditarFinanceiro.data.dataVencimento),
            "yyyy-MM-dd"
          ),
          Valor: responseEditarFinanceiro.data.valor,
          FormaPagamento: responseEditarFinanceiro.data.formaPagamento,
          Situacao: responseEditarFinanceiro.data.situacao,
          todosAlunos: false,
        }));
      }
    },
    [responseEditarFinanceiro]
  );

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    if (value == "todos") {
      setTodos(true);
      setValues({ ...values, AlunoId: 0 });
    } else if (name == "AlunoNome" && value !== "todos") {
      setTodos(false);
      setValues({ ...values, [name]: e.target.value });
    } else {
      setValues({ ...values, [name]: e.target.value });
    }
  };

  function showAlunos(alunos) {
    return responseAluno.data.map((aluno) => (
      <MenuItem value={aluno.nome}>{aluno.nome}</MenuItem>
    ));
  }

  const handleClickOpen = () => {
    if (todos == true) {
      setOpen(true);
    } else {
      handleSubmit();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(e) {
    alert("Sucess: \n\n" + JSON.stringify(values, null, 4));
    console.log(JSON.stringify(values));

    const response = fetch("https://localhost:44389/api/financeiro", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response == "Financeiro gerado") {
          console.log("Deu bom");
          console.log(response);
        } else {
          console.log("Deu ruim");
        }
      });
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.titulo}>
            <h1>Cadastro de Financeiro</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="AlunoNome"
                  name="AlunoNome"
                  label="Alunos"
                  onChange={handleChange}
                  value={values.AlunoNome}
                  disabled={ (values.Id != "") ? true : false}
                  fullWidth
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {/* {
                    (values.AlunoNome != "" ? (
                      <MenuItem value={values.AlunoNome}>
                        {values.AlunoNome}
                      </MenuItem>
                    ) : (
                      <MenuItem value="todos">Todos</MenuItem>
                    ),
                    responseAluno.data ? showAlunos(responseAluno.data) : false)
                  } */}

                    <MenuItem value="todos">Todos</MenuItem>                   
                    {responseAluno.data ? showAlunos(responseAluno.data) : false}
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="DataVencimento"
                  name="DataVencimento"
                  type="date"
                  label="Vencimento"
                  value={values.DataVencimento}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="Valor"
                  name="Valor"
                  label="Valor"
                  value={values.Valor}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <TextField
                  id="FormaPagamento"
                  name="FormaPagamento"
                  label="Forma de Pagamento"
                  value={values.FormaPagamento}
                  onChange={handleChange}
                  fullWidth
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  <MenuItem value="boleto">Boleto</MenuItem>
                  <MenuItem value="pix">PIX</MenuItem>
                  <MenuItem value="dinheiro">Dinheiro</MenuItem>
                  <MenuItem value="cartão">Cartão</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Tooltip
                  title="Não pode ser usado para todos alunos"
                  placement="top-end"
                >
                  <TextField
                    id="qtdProvisionar"
                    name="qtdProvisionar"
                    label="Provisionar"
                    onChange={handleChange}
                    value={values.qtdProvisionar}
                    fullWidth
                    disabled={
                      values.Id > 0
                        ? true
                        : todos
                        ? false
                        : true
                    }
                    select
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                  </TextField>
                </Tooltip>
              </Grid>
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
              >
                Cadastrar
              </Button>
            </div>
          </form>
          <div></div>
        </Paper>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Alerta!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Essa ação irá gerar CRE para todos alunos. Deseja continuar?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Não</Button>
            <Button onClick={handleSubmit} autoFocus>
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </React.Fragment>
  );
}

export default CadastroFinanceiro;
