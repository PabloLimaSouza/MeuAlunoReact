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
  Collapse,
  InputAdornment    
} from "@material-ui/core";
import StoreContext from "../../contexts/StoreContext";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router";
import et from "date-fns/esm/locale/et/index.js";
import { parseJSON } from "date-fns";
import { format } from "date-fns";
import { currencyMask, onlyLetters } from "../../utils/mask";
import { setDayOfYear } from "date-fns/esm";

function CadastroFinanceiro() {
  const classes = useStyles();
  var CurrencyFormat = require("react-currency-format");
  const { token, userLogged } = useContext(StoreContext);

  const urlAlunos = `https://localhost:44389/api/alunoPorEmpresa/${userLogged.empresaId}`;
 
  
  const responseAluno = useFetch(urlAlunos,"get",token);
  const [todos, setTodos] = useState(false);
  const [loading,setLoading] = useState(false);
  const [tipoReceber, setTipoDoc] = useState(true);
  const history = useHistory();

  const editarFinanceiro = window.location.pathname.split("/");
  var editarFinanceiroUrl = "";
  var editando = false;
  if (editarFinanceiro[2] != null) {
    editarFinanceiroUrl = `https://localhost:44389/api/cadastroFinanceiro/${editarFinanceiro[2]}`;
    editando = true;
  }
  const responseEditarFinanceiro = useFetch(editarFinanceiroUrl,"get",token);

  const initialValues = {
    Id: 0,
    AlunoId: 0,
    AlunoNome: "",
    PessoaNome: "",
    DataVencimento: "",
    qtdProvisionar: 0,
    Valor: "",
    FormaPagamento: "",
    Situacao: 1,
    EmpresaId: userLogged.empresaId,
    todosAlunos: false,
    Tipo: "",
  };

  const [values, setValues] = useState(initialValues);

  const alertas = {
    text: "",
    title: ""
  }

  const [mensagem, setMensagem] = useState(alertas);

  const [open, setOpen] = useState(false);

  const validadorForm = () => {
    if (values.AlunoNome == "" && values.PessoaNome == "" && todos == false) {
      setMensagem({ ...values, title: "Alerta!", text: "Necessário selecionar um aluno ou informar uma pessoa" });
      setOpen(true);
    } else if (values.Valor == "") {
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar valor" });
      setOpen(true);
    } else if (values.FormaPagamento == "") {
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar valor" });
      setOpen(true);
    } else if (values.DataVencimento == "") {
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar data de vencimento" });
      setOpen(true);
    } else {
      return true;
    }
  }

  const getDialogActions = (e) => {       
    if (e === "Atenção!"){
      return (
        <DialogActions>
              <Button onClick={() =>{ setTodos(false); handleClose()}}>Não</Button>
              <Button onClick={handleClose} autoFocus>Sim</Button>
            </DialogActions>
      )
    } 
    else if(e === "Sucesso!") {
      return (
        <DialogActions>
      <Button onClick={() => { handleClose(); history.push("/financeiros"); }}>Ok</Button>
      </DialogActions>
      )
      
    } else {
      return (
          <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
      )    
    }
  }

  useEffect(
    function () {
      if (todos) {
        setValues({ ...values, AlunoNome: "", qtdProvisionar: 0, todosAlunos: true })
      }
      if (!todos) {
        setValues({ ...values, todosAlunos: false })
      }
    },
    [todos]
  )

  useEffect(
    function () {
      console.log(responseEditarFinanceiro.data);
      if (responseEditarFinanceiro.data != null) {
        setValues((prevState) => ({
          Id: responseEditarFinanceiro.data.id,
          AlunoId: responseEditarFinanceiro.data.alunoId,
          AlunoNome: responseEditarFinanceiro.data.nomeAluno,
          PessoaNome: responseEditarFinanceiro.data.pessoaNome,
          DataVencimento: format(
            new Date(responseEditarFinanceiro.data.dataVencimento),
            "yyyy-MM-dd"
          ),
          Valor: responseEditarFinanceiro.data.valor,
          FormaPagamento: responseEditarFinanceiro.data.formaPagamento,
          Situacao: responseEditarFinanceiro.data.situacao,
          todosAlunos: false,
          Tipo: responseEditarFinanceiro.data.tipo,
          EmpresaId: responseEditarFinanceiro.data.empresaId,
        }));
      }
    },
    [responseEditarFinanceiro]
  );

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    if (name == "AlunoNome") {
      setValues({ ...values, [name]: e.target.value, AlunoId: e.target.value })
    } else if (name == "Tipo" && value != 1) {
      setTipoDoc(false);
      setValues({ ...values, [name]: e.target.value });
    } else if (name == "Tipo" && value != 2) {
      setTipoDoc(true);
      setValues({ ...values, [name]: e.target.value });
    }
    else {
      setValues({ ...values, [name]: e.target.value });
    }
  };

  const handleCheckChange = () => {
    setTodos(!todos);
    if (!todos) {
      setTodos(!todos);
      setValues({ ...values, AlunoId: 0, AlunoNome: "" });
      setMensagem({ ...values, title: "Atenção!", text: "Essa ação irá gerar um CRE (contas a receber) para cada aluno. Deseja continuar?" })
      setOpen(true);
    } else {
      setTodos(!todos);
    }

  };

  function showAlunos(alunos) {
    console.log(responseAluno.data);
    return responseAluno.data.map((aluno) => (
      <MenuItem value={aluno.id}>{aluno.nome}</MenuItem>
    ));
  }

  const handleClickOpen = () => {
    if (validadorForm()) {
      handleSubmit();
    } else {
      console.log("form inválido");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(e) {  
    setLoading(true);  
    
    const response = fetch("https://localhost:44389/api/financeiro/cadastrar", {
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
        if (response != null && response.errors == null) {
          setMensagem({ ...values, title: "Sucesso!", text: response })
          setOpen(true);          
        } else {
          setMensagem({ ...values, title: "Erro!", text: "Erro ao gerar documento(s)" })
          setOpen(true);
        }
      })
      .then(() => {
        setLoading(false);
      })
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
                  id="Tipo"
                  name="Tipo"
                  label="Tipo"
                  onChange={handleChange}
                  value={values.Tipo}
                  fullWidth
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  <MenuItem value="1">Receber</MenuItem>
                  <MenuItem value="2">Pagar</MenuItem>

                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Collapse in={tipoReceber ? true : false}>
                  <TextField
                    id="AlunoNome"
                    name="AlunoNome"
                    label="Aluno"
                    onChange={handleChange}
                    value={values.AlunoId}
                    inputProps={{
                      "data-id": `${values.AlunoId}`,
                    }}
                    disabled={todos ? true : false}
                    fullWidth
                    select                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {responseAluno.data ? showAlunos(responseAluno.data) : false}
                  </TextField>
                </Collapse>
                <Collapse in={tipoReceber ? false : true}>
                  <TextField
                    id="PessoaNome"
                    name="PessoaNome"
                    label="Pessoa"
                    onChange={(e) => handleChange(onlyLetters(e))}
                    value={values.PessoaNome}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                  </TextField>
                </Collapse>

              </Grid>
              {(editando)
                ? false
                : <Grid item xs={12} sm={2}>
                  <FormLabel>Todos</FormLabel>
                  <Switch
                    color="primary"
                    name="todos"
                    value={todos}
                    checked={todos}
                    disabled={values.Tipo == 2 ? true : false}
                    onChange={handleCheckChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    fullWidth
                  />
                </Grid>}

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
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  id="Valor"
                  name="Valor"
                  label="Valor"
                  value={values.Valor}
                  onChange={(e) => handleChange(currencyMask(e))}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                />
              </Grid>
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
              {(editando)
                ? false
                : <Grid item xs={2}>
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
                      disabled={todos ? true : false}
                      select
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      <MenuItem selected value="0">0</MenuItem>
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
                </Grid>}
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
                disabled={loading}
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
            {getDialogActions(mensagem.title)}
        </Dialog>
      </main>
    </React.Fragment>
  );
}

export default CadastroFinanceiro;
